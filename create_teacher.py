from app import app
from extensions import db
from models import User

def create_teacher(email, password, name):
    with app.app_context():
        # Check if user already exists
        if User.query.filter_by(email=email).first():
            print(f"User with email {email} already exists")
            return

        # Create new teacher user
        user = User(email=email, name=name, role='teacher')
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        print(f"Teacher account created successfully for {email}")

if __name__ == '__main__':
    email = input("Enter teacher's email: ")
    password = input("Enter teacher's password: ")
    name = input("Enter teacher's name: ")
    create_teacher(email, password, name) 