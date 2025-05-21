import os
import boto3
from botocore.exceptions import ClientError
import logging
from backup_db import backup_database

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_aws_credentials():
    """Test AWS credentials and S3 bucket access."""
    try:
        # Check if credentials are set
        required_vars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_BUCKET_NAME']
        missing_vars = [var for var in required_vars if not os.getenv(var)]
        
        if missing_vars:
            logger.error(f"Missing environment variables: {', '.join(missing_vars)}")
            return False

        # Test S3 connection
        s3_client = boto3.client('s3')
        bucket_name = os.getenv('AWS_BUCKET_NAME')
        
        # Try to list objects in bucket
        response = s3_client.list_objects_v2(
            Bucket=bucket_name,
            MaxKeys=1
        )
        
        logger.info("✅ AWS credentials are valid")
        logger.info(f"✅ Successfully connected to S3 bucket: {bucket_name}")
        return True

    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'InvalidAccessKeyId':
            logger.error("❌ Invalid AWS Access Key ID")
        elif error_code == 'SignatureDoesNotMatch':
            logger.error("❌ Invalid AWS Secret Access Key")
        elif error_code == 'NoSuchBucket':
            logger.error(f"❌ Bucket {bucket_name} does not exist")
        else:
            logger.error(f"❌ AWS Error: {str(e)}")
        return False
    except Exception as e:
        logger.error(f"❌ Unexpected error: {str(e)}")
        return False

def create_test_backup():
    """Create a test backup and verify it exists in S3."""
    try:
        logger.info("Creating test backup...")
        if backup_database():
            logger.info("✅ Test backup created successfully")
            
            # Verify backup exists in S3
            s3_client = boto3.client('s3')
            bucket_name = os.getenv('AWS_BUCKET_NAME')
            
            response = s3_client.list_objects_v2(
                Bucket=bucket_name,
                Prefix='database_backups/'
            )
            
            if response.get('Contents'):
                latest_backup = max(response['Contents'], key=lambda x: x['LastModified'])
                logger.info(f"✅ Latest backup: {latest_backup['Key']}")
                logger.info(f"✅ Backup size: {latest_backup['Size']} bytes")
                logger.info(f"✅ Backup created at: {latest_backup['LastModified']}")
                return True
            else:
                logger.error("❌ No backups found in S3")
                return False
        else:
            logger.error("❌ Test backup failed")
            return False

    except Exception as e:
        logger.error(f"❌ Error during test backup: {str(e)}")
        return False

if __name__ == "__main__":
    print("\n=== Testing AWS Setup ===\n")
    
    if test_aws_credentials():
        print("\n=== Creating Test Backup ===\n")
        create_test_backup()
    else:
        print("\nPlease fix the AWS credentials and try again.") 