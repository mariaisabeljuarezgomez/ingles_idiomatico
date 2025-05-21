import os
import subprocess
import boto3
from botocore.exceptions import ClientError
import logging
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def list_backups():
    """List all available backups in S3."""
    try:
        s3_client = boto3.client('s3')
        bucket_name = os.getenv('AWS_BUCKET_NAME')
        
        response = s3_client.list_objects_v2(
            Bucket=bucket_name,
            Prefix='database_backups/'
        )
        
        backups = []
        for obj in response.get('Contents', []):
            if obj['Key'].endswith('.sql'):
                backups.append({
                    'filename': obj['Key'].split('/')[-1],
                    'size': obj['Size'],
                    'last_modified': obj['LastModified']
                })
        
        return sorted(backups, key=lambda x: x['last_modified'], reverse=True)
    except Exception as e:
        logger.error(f"Failed to list backups: {str(e)}")
        return []

def restore_database(backup_filename=None):
    """Restore database from a backup file."""
    try:
        # Get database URL from environment
        database_url = os.getenv('DATABASE_URL')
        if not database_url:
            raise ValueError("DATABASE_URL environment variable not set")

        # If no specific backup is provided, list available backups
        if not backup_filename:
            backups = list_backups()
            if not backups:
                logger.error("No backups found in S3")
                return False
            
            # Use the most recent backup
            backup_filename = backups[0]['filename']
            logger.info(f"Using most recent backup: {backup_filename}")

        # Download backup from S3
        s3_client = boto3.client('s3')
        bucket_name = os.getenv('AWS_BUCKET_NAME')
        
        try:
            s3_client.download_file(
                bucket_name,
                f'database_backups/{backup_filename}',
                backup_filename
            )
            logger.info(f"Downloaded backup: {backup_filename}")
        except ClientError as e:
            logger.error(f"Failed to download backup: {str(e)}")
            return False

        # Extract database credentials from URL
        db_parts = database_url.replace('postgresql://', '').split('@')
        credentials = db_parts[0].split(':')
        host_db = db_parts[1].split('/')
        
        username = credentials[0]
        password = credentials[1]
        host = host_db[0].split(':')[0]
        database = host_db[1]

        # Restore database using psql
        restore_command = [
            'psql',
            f'--host={host}',
            f'--username={username}',
            f'--dbname={database}',
            '-f', backup_filename
        ]

        # Set PGPASSWORD environment variable for psql
        env = os.environ.copy()
        env['PGPASSWORD'] = password

        # Execute restore command
        logger.info(f"Restoring database from backup: {backup_filename}")
        subprocess.run(restore_command, env=env, check=True)

        # Clean up downloaded backup file
        os.remove(backup_filename)
        logger.info("Restore completed successfully!")
        return True

    except Exception as e:
        logger.error(f"Restore failed: {str(e)}")
        return False

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='Restore database from backup')
    parser.add_argument('--backup', help='Specific backup filename to restore from')
    args = parser.parse_args()
    
    restore_database(args.backup) 