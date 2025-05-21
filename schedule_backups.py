import schedule
import time
from backup_db import backup_database
import logging
from datetime import datetime, timedelta
import boto3
from botocore.exceptions import ClientError
import os

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('backup_scheduler.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def cleanup_old_backups():
    """Remove backups older than 30 days."""
    try:
        s3_client = boto3.client('s3')
        bucket_name = os.getenv('AWS_BUCKET_NAME')
        
        # List all backups
        response = s3_client.list_objects_v2(
            Bucket=bucket_name,
            Prefix='database_backups/'
        )
        
        thirty_days_ago = datetime.now() - timedelta(days=30)
        
        for obj in response.get('Contents', []):
            if obj['Key'].endswith('.sql'):
                if obj['LastModified'] < thirty_days_ago:
                    s3_client.delete_object(
                        Bucket=bucket_name,
                        Key=obj['Key']
                    )
                    logger.info(f"Deleted old backup: {obj['Key']}")
    
    except Exception as e:
        logger.error(f"Failed to cleanup old backups: {str(e)}")

def backup_job():
    """Run the backup job and cleanup old backups."""
    logger.info("Starting scheduled backup...")
    if backup_database():
        logger.info("Backup completed successfully")
        cleanup_old_backups()
    else:
        logger.error("Backup failed")

def main():
    # Schedule backup to run daily at 2 AM
    schedule.every().day.at("02:00").do(backup_job)
    
    logger.info("Backup scheduler started")
    logger.info("Next backup scheduled for 02:00 AM")
    
    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == "__main__":
    main() 