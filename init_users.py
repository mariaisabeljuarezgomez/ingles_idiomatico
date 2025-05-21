from flask import Flask
from extensions import db
from models import User, StudentStats
from config import config
import os
from datetime import datetime
import logging

def init_users():
    # Set up logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    
    logger.info("Starting user initialization process...")
    
    # Create Flask app
    app = Flask(__name__)
    app.config.from_object(config[os.getenv('FLASK_ENV', 'production')])
    config[os.getenv('FLASK_ENV', 'production')].init_app(app)
    
    # Log database URL (with password redacted)
    db_url = app.config.get('SQLALCHEMY_DATABASE_URI', 'Not set!')
    if db_url != 'Not set!':
        # Redact password from URL for logging
        parts = db_url.split('@')
        if len(parts) > 1:
            safe_url = f"{parts[0].split(':')[0]}:****@{parts[1]}"
        else:
            safe_url = db_url
        logger.info(f"Using database URL: {safe_url}")
    else:
        logger.error("Database URL is not set!")
        return False

    # Initialize database
    db.init_app(app)

    with app.app_context():
        try:
            # Check if users already exist
            user_count = User.query.count()
            logger.info(f"Found {user_count} existing users")
            
            if user_count > 0:
                logger.info("Users already exist, skipping initialization")
                return True

            logger.info("No existing users found. Creating default users...")
            
            # Create admin user
            admin = User(
                email='admin@inglesidiomatico.com',
                name='Admin',
                role='admin',
                created_at=datetime.utcnow(),
                is_active=True,
                email_verified=True
            )
            admin.set_password('admin123')
            logger.info("Created admin user")

            # Create teacher user
            teacher = User(
                email='teacher@inglesidiomatico.com',
                name='Teacher',
                role='teacher',
                created_at=datetime.utcnow(),
                is_active=True,
                email_verified=True,
                specialization='English Language'
            )
            teacher.set_password('teacher123')
            logger.info("Created teacher user")

            # Create student user
            student = User(
                email='student@inglesidiomatico.com',
                name='Student',
                role='student',
                created_at=datetime.utcnow(),
                is_active=True,
                email_verified=True
            )
            student.set_password('student123')
            logger.info("Created student user")

            # Add users to database
            db.session.add(admin)
            db.session.add(teacher)
            db.session.add(student)
            
            # Flush session to get user IDs
            db.session.flush()
            
            # Create student stats
            stats = StudentStats(user_id=student.id)
            db.session.add(stats)
            
            # Commit all changes
            db.session.commit()
            logger.info("Successfully committed all users to database!")
            
            # Verify users were created
            admin_check = User.query.filter_by(email='admin@inglesidiomatico.com').first()
            teacher_check = User.query.filter_by(email='teacher@inglesidiomatico.com').first()
            student_check = User.query.filter_by(email='student@inglesidiomatico.com').first()
            
            if admin_check and teacher_check and student_check:
                logger.info("Verified all users were created successfully!")
                logger.info("\nDefault credentials:")
                logger.info("Admin - Email: admin@inglesidiomatico.com, Password: admin123")
                logger.info("Teacher - Email: teacher@inglesidiomatico.com, Password: teacher123")
                logger.info("Student - Email: student@inglesidiomatico.com, Password: student123")
                return True
            else:
                logger.error("User verification failed!")
                return False
            
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error creating users: {str(e)}")
            raise

if __name__ == '__main__':
    success = init_users()
    if not success:
        exit(1) 