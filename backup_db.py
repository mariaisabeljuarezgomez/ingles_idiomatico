import os
import subprocess
from datetime import datetime
import boto3
from botocore.exceptions import ClientError
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def backup_database():
    """Create a backup of the PostgreSQL database and upload to S3."""
    try:
        # Get database URL from environment
        database_url = os.getenv('DATABASE_URL')
        if not database_url:
            raise ValueError("DATABASE_URL environment variable not set")

        # Create backup filename with timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_filename = f'backup_{timestamp}.sql'
        
        # Extract database credentials from URL
        # Format: postgresql://username:password@host:port/database
        db_parts = database_url.replace('postgresql://', '').split('@')
        credentials = db_parts[0].split(':')
        host_db = db_parts[1].split('/')
        
        username = credentials[0]
        password = credentials[1]
        host = host_db[0].split(':')[0]
        database = host_db[1]

        # Create backup using pg_dump
        backup_command = [
            'pg_dump',
            f'--host={host}',
            f'--username={username}',
            f'--dbname={database}',
            f'--file={backup_filename}'
        ]

        # Set PGPASSWORD environment variable for pg_dump
        env = os.environ.copy()
        env['PGPASSWORD'] = password

        # Execute backup command
        logger.info(f"Creating database backup: {backup_filename}")
        subprocess.run(backup_command, env=env, check=True)

        # Upload to S3 if AWS credentials are available
        if all(os.getenv(key) for key in ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_BUCKET_NAME']):
            s3_client = boto3.client('s3')
            bucket_name = os.getenv('AWS_BUCKET_NAME')
            
            try:
                s3_client.upload_file(
                    backup_filename,
                    bucket_name,
                    f'database_backups/{backup_filename}'
                )
                logger.info(f"Backup uploaded to S3: {backup_filename}")
            except ClientError as e:
                logger.error(f"Failed to upload to S3: {str(e)}")
        
        # Clean up local backup file
        os.remove(backup_filename)
        logger.info("Local backup file removed")

        return True

    except Exception as e:
        logger.error(f"Backup failed: {str(e)}")
        return False

if __name__ == "__main__":
    backup_database() 