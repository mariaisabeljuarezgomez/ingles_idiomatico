from extensions import db
from datetime import datetime, timedelta
from flask_login import UserMixin
import json
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    name = db.Column(db.String(120))
    role = db.Column(db.String(20), default='student')  # 'student', 'teacher', 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Student specific fields
    current_lesson = db.Column(db.Integer, default=1)
    total_study_time = db.Column(db.Integer, default=0)  # in minutes
    last_active = db.Column(db.DateTime)
    
    # Teacher specific fields
    assigned_students = db.relationship('User', 
        secondary='teacher_student_association',
        primaryjoin='User.id==teacher_student_association.c.teacher_id',
        secondaryjoin='User.id==teacher_student_association.c.student_id',
        backref=db.backref('teachers', lazy='dynamic'),
        lazy='dynamic'
    )
    specialization = db.Column(db.String(100))  # e.g., 'pronunciation', 'grammar'
    teaching_since = db.Column(db.DateTime)
    availability = db.Column(db.JSON)  # Store teaching schedule
    
    # Admin specific fields
    admin_level = db.Column(db.Integer)  # Different levels of admin access
    managed_sections = db.Column(db.JSON)  # Sections of the platform they manage
    last_admin_action = db.Column(db.DateTime)
    
    # Common fields for teachers and admins
    is_active = db.Column(db.Boolean, default=True)
    last_login_ip = db.Column(db.String(45))
    access_level = db.Column(db.Integer, default=1)
    
    # Relationships
    progress = db.relationship('LessonProgress', backref='user', lazy=True)
    recordings = db.relationship('PronunciationRecording', backref='user', lazy=True)
    exercise_attempts = db.relationship('ExerciseAttempt', backref='user', lazy=True)
    feedback_given = db.relationship('TeacherFeedback', backref='teacher', lazy=True, foreign_keys='TeacherFeedback.teacher_id')
    feedback_received = db.relationship('TeacherFeedback', backref='student', lazy=True, foreign_keys='TeacherFeedback.student_id')

    # Authentication and security fields
    email_verified = db.Column(db.Boolean, default=False)
    verification_token = db.Column(db.String(100))
    reset_token = db.Column(db.String(100))
    reset_token_expiry = db.Column(db.DateTime)
    last_login = db.Column(db.DateTime)
    login_count = db.Column(db.Integer, default=0)
    failed_login_attempts = db.Column(db.Integer, default=0)
    account_locked_until = db.Column(db.DateTime)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def is_admin(self):
        return self.role == 'admin'
    
    def is_teacher(self):
        return self.role == 'teacher'
    
    def is_student(self):
        return self.role == 'student'
    
    def can_access_admin_dashboard(self):
        return self.is_admin() and self.is_active
    
    def can_access_teacher_dashboard(self):
        return (self.is_teacher() or self.is_admin()) and self.is_active
    
    def get_student_count(self):
        if self.is_teacher():
            return self.assigned_students.count()
        return 0
    
    def get_average_student_progress(self):
        if not self.is_teacher():
            return 0
        total_progress = 0
        student_count = 0
        for student in self.assigned_students:
            progress = LessonProgress.query.filter_by(user_id=student.id).all()
            if progress:
                avg_progress = sum([p.completion_percentage for p in progress]) / len(progress)
                total_progress += avg_progress
                student_count += 1
        return total_progress / student_count if student_count > 0 else 0
    
    def record_login(self, ip_address):
        self.last_login = datetime.utcnow()
        self.last_login_ip = ip_address
        self.login_count += 1
        self.failed_login_attempts = 0
        self.account_locked_until = None
        
    def record_failed_login(self):
        self.failed_login_attempts += 1
        if self.failed_login_attempts >= 5:
            self.account_locked_until = datetime.utcnow() + timedelta(minutes=30)
    
    def is_account_locked(self):
        if self.account_locked_until and datetime.utcnow() < self.account_locked_until:
            return True
        return False

# Association table for teacher-student relationship
teacher_student_association = db.Table('teacher_student_association',
    db.Column('teacher_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('student_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('assigned_at', db.DateTime, default=datetime.utcnow),
    db.Column('active', db.Boolean, default=True)
)

class TeacherFeedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lesson_number = db.Column(db.Integer, nullable=False)
    exercise_id = db.Column(db.String(50))
    feedback_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    feedback_type = db.Column(db.String(50))  # 'pronunciation', 'grammar', 'general'
    score = db.Column(db.Float)
    status = db.Column(db.String(20), default='pending')  # 'pending', 'reviewed', 'archived'
    student_response = db.Column(db.Text)
    student_response_date = db.Column(db.DateTime)

class LessonProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lesson_number = db.Column(db.Integer, nullable=False)
    completion_percentage = db.Column(db.Float, default=0.0)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    time_spent = db.Column(db.Integer, default=0)  # in minutes
    
    # Composite unique constraint
    __table_args__ = (db.UniqueConstraint('user_id', 'lesson_number'),)

    # New fields for lesson progress analytics
    exercises_total = db.Column(db.Integer, default=0)
    exercises_completed = db.Column(db.Integer, default=0)
    last_exercise_date = db.Column(db.DateTime)
    avg_exercise_score = db.Column(db.Float, default=0.0)
    difficulty_rating = db.Column(db.Float, default=0.0)  # 1-5 scale

class ExerciseAttempt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lesson_number = db.Column(db.Integer, nullable=False)
    exercise_id = db.Column(db.String(50), nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    answer_given = db.Column(db.Text)
    attempt_date = db.Column(db.DateTime, default=datetime.utcnow)
    time_taken = db.Column(db.Integer)  # in seconds

    # New fields for exercise attempt analytics
    exercise_type = db.Column(db.String(50))  # grammar, vocabulary, pronunciation
    difficulty_level = db.Column(db.Integer)  # 1-5 scale
    hints_used = db.Column(db.Integer, default=0)
    time_of_day = db.Column(db.Time)
    session_id = db.Column(db.String(50))  # Group attempts in study sessions

class PronunciationRecording(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lesson_number = db.Column(db.Integer, nullable=False)
    exercise_id = db.Column(db.String(50), nullable=False)
    recording_path = db.Column(db.String(255), nullable=False)
    recorded_at = db.Column(db.DateTime, default=datetime.utcnow)
    teacher_feedback = db.Column(db.Text)
    score = db.Column(db.Float)  # Optional score given by teacher

    # New fields for pronunciation recording analytics
    word_or_phrase = db.Column(db.String(255))
    confidence_score = db.Column(db.Float)  # AI-generated confidence score
    accent_rating = db.Column(db.Float)  # 1-5 scale
    clarity_rating = db.Column(db.Float)  # 1-5 scale
    retry_count = db.Column(db.Integer, default=0)

class Analytics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    study_time = db.Column(db.Integer, default=0)  # minutes
    exercises_completed = db.Column(db.Integer, default=0)
    correct_answers = db.Column(db.Integer, default=0)
    recordings_made = db.Column(db.Integer, default=0)
    lesson_progress = db.Column(db.JSON)  # Store daily lesson progress

    __table_args__ = (db.UniqueConstraint('user_id', 'date'),)

class StudentStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    
    # Overall statistics
    total_exercises_completed = db.Column(db.Integer, default=0)
    correct_answers = db.Column(db.Integer, default=0)
    incorrect_answers = db.Column(db.Integer, default=0)
    total_recordings = db.Column(db.Integer, default=0)
    total_study_time = db.Column(db.Integer, default=0)  # minutes
    average_score = db.Column(db.Float, default=0.0)
    
    # Time analysis
    avg_time_per_exercise = db.Column(db.Float, default=0.0)  # seconds
    avg_time_per_lesson = db.Column(db.Float, default=0.0)  # minutes
    best_study_time = db.Column(db.String(20))  # Time of day with best performance
    
    # Progress metrics
    current_streak = db.Column(db.Integer, default=0)  # consecutive days of activity
    longest_streak = db.Column(db.Integer, default=0)
    last_activity_date = db.Column(db.Date)
    completion_rate = db.Column(db.Float, default=0.0)  # % of assigned work completed
    
    # Performance metrics
    pronunciation_score = db.Column(db.Float, default=0.0)
    grammar_score = db.Column(db.Float, default=0.0)
    vocabulary_score = db.Column(db.Float, default=0.0)
    
    # Engagement metrics
    participation_rate = db.Column(db.Float, default=0.0)  # % of days active
    avg_sessions_per_week = db.Column(db.Float, default=0.0)
    
    # Difficulty analysis
    challenging_topics = db.Column(db.JSON)  # Store topics with low performance
    strong_topics = db.Column(db.JSON)  # Store topics with high performance
    
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

    @property
    def accuracy_rate(self):
        total = self.correct_answers + self.incorrect_answers
        return (self.correct_answers / total * 100) if total > 0 else 0

    def update_streak(self):
        today = datetime.utcnow().date()
        if self.last_activity_date:
            if self.last_activity_date == today - timedelta(days=1):
                self.current_streak += 1
                self.longest_streak = max(self.current_streak, self.longest_streak)
            elif self.last_activity_date != today:
                self.current_streak = 1
        else:
            self.current_streak = 1
        self.last_activity_date = today

    def update_challenging_topics(self, topic, score):
        topics = json.loads(self.challenging_topics or '{}')
        topics[topic] = score
        self.challenging_topics = json.dumps(dict(sorted(topics.items(), key=lambda x: x[1])[:5]))

    def update_strong_topics(self, topic, score):
        topics = json.loads(self.strong_topics or '{}')
        topics[topic] = score
        self.strong_topics = json.dumps(dict(sorted(topics.items(), key=lambda x: x[1], reverse=True)[:5])) 