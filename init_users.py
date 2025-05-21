from app import app
from extensions import db
from models import User, StudentStats
from datetime import datetime

def init_test_users():
    with app.app_context():
        try:
            # Check if admin already exists
            admin = User.query.filter_by(email='admin@inglesidiomatico.com').first()
            if not admin:
                admin = User(
                    email='admin@inglesidiomatico.com',
                    name='Admin User',
                    role='admin',
                    created_at=datetime.utcnow(),
                    is_active=True,
                    admin_level=1,
                    email_verified=True
                )
                admin.set_password('admin123!')
                db.session.add(admin)
                db.session.flush()  # This assigns the ID to admin

            # Check if teacher already exists
            teacher = User.query.filter_by(email='teacher@inglesidiomatico.com').first()
            if not teacher:
                teacher = User(
                    email='teacher@inglesidiomatico.com',
                    name='Teacher User',
                    role='teacher',
                    created_at=datetime.utcnow(),
                    is_active=True,
                    specialization='pronunciation',
                    email_verified=True
                )
                teacher.set_password('teacher123!')
                db.session.add(teacher)
                db.session.flush()  # This assigns the ID to teacher

            # Check if student already exists
            student = User.query.filter_by(email='student@inglesidiomatico.com').first()
            if not student:
                student = User(
                    email='student@inglesidiomatico.com',
                    name='Student User',
                    role='student',
                    created_at=datetime.utcnow(),
                    is_active=True,
                    current_lesson=1,
                    email_verified=True
                )
                student.set_password('student123!')
                db.session.add(student)
                db.session.flush()  # This assigns the ID to student
                
                # Create student stats with the correct user_id
                stats = StudentStats(user_id=student.id)
                db.session.add(stats)

            # Assign student to teacher if both exist and not already assigned
            if teacher and student and student not in teacher.assigned_students:
                teacher.assigned_students.append(student)

            db.session.commit()
            print("Test users created successfully!")
            print("\nLogin Credentials:")
            print("------------------")
            print("Admin:")
            print("Email: admin@inglesidiomatico.com")
            print("Password: admin123!")
            print("\nTeacher:")
            print("Email: teacher@inglesidiomatico.com")
            print("Password: teacher123!")
            print("\nStudent:")
            print("Email: student@inglesidiomatico.com")
            print("Password: student123!")
        except Exception as e:
            db.session.rollback()
            print(f"Error creating test users: {str(e)}")
            raise  # Re-raise the exception to see it in the logs

if __name__ == '__main__':
    init_test_users() 