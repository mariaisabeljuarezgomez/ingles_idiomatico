from flask import Flask
from extensions import db
from models import User, StudentStats
from config import config
import os
from datetime import datetime

def init_users():
    app = Flask(__name__)
    app.config.from_object(config[os.getenv('FLASK_ENV', 'production')])
    config[os.getenv('FLASK_ENV', 'production')].init_app(app)
    db.init_app(app)

    with app.app_context():
        # Check if users already exist
        if User.query.first() is not None:
            print("Users already exist, skipping initialization")
            return

        print("Initializing default users...")
        
        # Create admin user
        admin = User(
            email='admin@inglesidiomatico.com',
            name='Admin',
            role='admin',
            created_at=datetime.utcnow(),
            is_active=True,
            email_verified=True
        )
        admin.set_password('admin123')  # You should change this password

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
        teacher.set_password('teacher123')  # You should change this password

        # Create student user
        student = User(
            email='student@inglesidiomatico.com',
            name='Student',
            role='student',
            created_at=datetime.utcnow(),
            is_active=True,
            email_verified=True
        )
        student.set_password('student123')  # You should change this password

        try:
            # Add users to database
            db.session.add(admin)
            db.session.add(teacher)
            db.session.add(student)
            
            # Create student stats
            stats = StudentStats(user_id=3)  # ID will be 3 since it's the third user
            db.session.add(stats)
            
            db.session.commit()
            print("Default users created successfully!")
            
            # Print credentials for reference
            print("\nDefault credentials:")
            print("Admin - Email: admin@inglesidiomatico.com, Password: admin123")
            print("Teacher - Email: teacher@inglesidiomatico.com, Password: teacher123")
            print("Student - Email: student@inglesidiomatico.com, Password: student123")
            
        except Exception as e:
            db.session.rollback()
            print(f"Error creating users: {str(e)}")
            raise

if __name__ == '__main__':
    init_users() 