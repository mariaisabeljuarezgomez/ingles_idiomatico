import os
import logging
from sqlalchemy import create_engine, text, inspect
import boto3
from botocore.exceptions import ClientError

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def verify_database():
    """Verify database connection and configuration."""
    try:
        database_url = os.getenv('DATABASE_URL')
        if not database_url:
            logger.error("❌ DATABASE_URL environment variable not set")
            return False

        # Transform postgres:// to postgresql:// if needed
        if database_url.startswith("postgres://"):
            database_url = database_url.replace("postgres://", "postgresql://", 1)

        # Test database connection
        engine = create_engine(database_url)
        inspector = inspect(engine)
        
        with engine.connect() as connection:
            # Basic connection test
            result = connection.execute(text("SELECT 1"))
            if result.scalar() != 1:
                logger.error("❌ Database connection test failed")
                return False
            logger.info("✅ Database connection successful")
            
            # Check if user table exists
            if 'user' not in inspector.get_table_names():
                logger.error("❌ User table does not exist")
                return False
            logger.info("✅ User table exists")
            
            # Verify user table structure
            columns = {col['name']: col for col in inspector.get_columns('user')}
            required_columns = ['id', 'email', 'password_hash', 'role', 'created_at']
            
            for col in required_columns:
                if col not in columns:
                    logger.error(f"❌ Required column '{col}' missing from user table")
                    return False
            logger.info("✅ User table structure verified")
            
            # Test user table query
            result = connection.execute(text("SELECT COUNT(*) FROM \"user\""))
            count = result.scalar()
            logger.info(f"✅ User table contains {count} records")
            
            return True

    except Exception as e:
        logger.error(f"❌ Database error: {str(e)}")
        return False

def verify_aws():
    """Verify AWS credentials and S3 bucket access."""
    try:
        # Check required environment variables
        required_vars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_BUCKET_NAME']
        missing_vars = [var for var in required_vars if not os.getenv(var)]
        
        if missing_vars:
            logger.error(f"❌ Missing AWS environment variables: {', '.join(missing_vars)}")
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
        logger.error(f"❌ Unexpected AWS error: {str(e)}")
        return False

if __name__ == "__main__":
    print("\n=== Verifying Setup ===\n")
    
    print("Checking database connection...")
    db_status = verify_database()
    
    print("\nChecking AWS configuration...")
    aws_status = verify_aws()
    
    print("\n=== Summary ===")
    print(f"Database: {'✅ OK' if db_status else '❌ Failed'}")
    print(f"AWS: {'✅ OK' if aws_status else '❌ Failed'}")
    
    if db_status and aws_status:
        print("\n✅ All systems verified successfully!")
    else:
        print("\n❌ Some verifications failed. Please check the logs above.")

    if verify_database():
        logger.info("✅ All database checks passed")
        exit(0)
    else:
        logger.error("❌ Database verification failed")
        exit(1) 