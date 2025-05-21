# Inglés Idiomático - Learning Management System

A comprehensive learning management system for English language learning, featuring student progress tracking, pronunciation recording management, and detailed analytics.

## Features

- User Authentication (Email/Password)
- Role-based Access (Admin, Teacher, Student)
- Progress Tracking
- Pronunciation Recording Management
- Teacher Feedback System
- Comprehensive Analytics
- Real-time Dashboard Updates

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables in `.env`:
```
FLASK_ENV=development
DATABASE_URL=postgresql://your_db_url
SECRET_KEY=your_secret_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

4. Initialize the database:
```bash
flask db upgrade
```

5. Create test users:
```bash
python init_users.py
```

6. Run the application:
```bash
python app.py
```

## Test Users

The following test users are created when running `init_users.py`:

### Admin User
- Email: admin@inglesidiomatico.com
- Password: admin123!

### Teacher User
- Email: teacher@inglesidiomatico.com
- Password: teacher123!

### Student User
- Email: student@inglesidiomatico.com
- Password: student123!

## Database Schema

The system uses PostgreSQL and includes the following main models:
- User
- LessonProgress
- ExerciseAttempt
- PronunciationRecording
- StudentStats
- Analytics
- TeacherFeedback

## API Endpoints

The application provides RESTful API endpoints for:
- User authentication
- Student progress tracking
- Teacher feedback management
- Analytics and reporting
- File management

## Deployment

The application is designed to be deployed on platforms like Render. Make sure to:
1. Set up all required environment variables
2. Configure the PostgreSQL database
3. Set up AWS S3 for file storage
4. Initialize the database and create test users

## Security Notes

- All passwords are hashed using secure methods
- Session management is implemented
- Rate limiting is in place for API endpoints
- Environment variables are used for sensitive data 