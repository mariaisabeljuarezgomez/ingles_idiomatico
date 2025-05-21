import os
os.environ['FLASK_ENV'] = 'development'
os.environ['DATABASE_URL'] = 'sqlite:///app.db'

from app import app, db
from models import User, StudentStats
from datetime import datetime

def create_student():
    with app.app_context():
        # Check if user exists
        user = User.query.filter_by(email='isabel@inglesidiomatico.com').first()
        
        if user:
            # Update password
            user.set_password('juarez')
            db.session.commit()
            print("Password updated successfully!")
        else:
            # Create new user
            user = User(
                email='isabel@inglesidiomatico.com',
                name='Isabel',
                role='student',
                created_at=datetime.utcnow(),
                is_active=True,
                email_verified=True
            )
            user.set_password('juarez')
            db.session.add(user)
            db.session.commit()
            print("Student user created successfully!")

if __name__ == '__main__':
    create_student() 