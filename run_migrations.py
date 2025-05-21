import os
import subprocess
from backup_db import backup_database
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_migrations():
    """Run database migrations with backup."""
    try:
        # First, backup the database
        logger.info("Creating database backup before migration...")
        if not backup_database():
            logger.error("Backup failed. Aborting migration.")
            return False

        # Run migrations
        logger.info("Running database migrations...")
        
        # Initialize migrations if not already done
        if not os.path.exists('migrations'):
            logger.info("Initializing migrations...")
            subprocess.run(['flask', 'db', 'init'], check=True)
        
        # Create new migration
        logger.info("Creating new migration...")
        subprocess.run(['flask', 'db', 'migrate', '-m', 'Database update'], check=True)
        
        # Apply migration
        logger.info("Applying migration...")
        subprocess.run(['flask', 'db', 'upgrade'], check=True)
        
        logger.info("Migrations completed successfully!")
        return True

    except subprocess.CalledProcessError as e:
        logger.error(f"Migration failed: {str(e)}")
        return False
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return False

if __name__ == "__main__":
    run_migrations() 