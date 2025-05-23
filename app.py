from flask import Flask, send_from_directory, jsonify, request, render_template, redirect, url_for, flash
from flask_cors import CORS
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime, timedelta
from flask_migrate import Migrate
import csv
from io import StringIO
from flask_mail import Mail, Message
from flask_wtf.csrf import CSRFProtect
from flask_wtf import FlaskForm
import logging
from logging.handlers import RotatingFileHandler

# Import db from extensions first
from extensions import db

# Then import models after db is defined
from models import User, LessonProgress, ExerciseAttempt, PronunciationRecording, StudentStats, Analytics, TeacherFeedback
from config import config
from init_users import init_users

app = Flask(__name__, static_folder='static')

# Configure the application
app.config.from_object(config[os.getenv('FLASK_ENV', 'production')])
config[os.getenv('FLASK_ENV', 'production')].init_app(app)

# Debug logging for database configuration
app.logger.info('Inglés Idiomático startup')
app.logger.info(f"Database URL: {app.config.get('SQLALCHEMY_DATABASE_URI', 'Not set!')}")
app.logger.info(f"Environment: {os.getenv('FLASK_ENV', 'production')}")

# Configure logging
if not app.debug:
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/ingles_idiomatico.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)

# Ensure secret key is set
if not app.secret_key:
    app.secret_key = os.urandom(24)

# Initialize extensions
CORS(app)
csrf = CSRFProtect(app)

# Initialize database
db.init_app(app)
with app.app_context():
    try:
        db.create_all()
        app.logger.info("Database tables created successfully")
        # Initialize default users
        init_users()
        app.logger.info("Default users initialized")
    except Exception as e:
        app.logger.error(f"Error during startup: {str(e)}")

# Initialize other extensions
migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Initialize Flask-Mail only if email configuration is available
if os.getenv('MAIL_USERNAME') and os.getenv('MAIL_PASSWORD'):
    mail = Mail(app)
else:
    mail = None

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/register', methods=['GET'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('student_dashboard')) # MODIFIED: Redirect to student_dashboard for authenticated students
    return render_template('register.html')

@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'success': False, 'message': 'Email already registered'}), 400
    
    user = User(
        email=data.get('email'),
        name=data.get('name'),
        role='student'
    )
    user.set_password(data.get('password'))
    
    try:
        db.session.add(user)
        # Initialize student stats
        stats = StudentStats(user_id=user.id)
        db.session.add(stats)
        db.session.commit()
        login_user(user)
        return jsonify({'success': True, 'redirect_url': url_for('student_dashboard')}) # MODIFIED: Add redirect_url
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

class LoginForm(FlaskForm):
    pass

@app.route('/login', methods=['GET', 'POST'])
def login():
    try:
        if current_user.is_authenticated:
            return redirect(url_for('student_dashboard')) # MODIFIED: Redirect to student_dashboard for authenticated students
        
        form = LoginForm()
        if request.method == 'POST':
            email = request.form.get('email')
            password = request.form.get('password')
            remember = request.form.get('remember', False)
            
            if not email or not password:
                flash('Please provide both email and password')
                return redirect(url_for('login'))
            
            user = User.query.filter_by(email=email).first()
            
            if user and user.check_password(password):
                try:
                    login_user(user, remember=remember)
                    user.last_active = datetime.utcnow()
                    db.session.commit()
                    return redirect(url_for('student_dashboard')) # MODIFIED: Redirect to student_dashboard after successful login
                except Exception as e:
                    app.logger.error(f"Login error for user {email}: {str(e)}")
                    db.session.rollback()
                    flash('An error occurred during login. Please try again.')
            else:
                flash('Invalid email or password')
            return redirect(url_for('login'))
            
        return render_template('login.html', form=form)
    except Exception as e:
        app.logger.error(f"Unexpected error in login route: {str(e)}")
        flash('An unexpected error occurred. Please try again later.')
        return redirect(url_for('login'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index')) # MODIFIED: Redirect to 'index' which then handles unauthenticated users to login

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.role == 'teacher':
        return redirect('/teacher-dashboard')
    elif current_user.role == 'admin': # Added this to match your flow
        return redirect('/admin-dashboard') # Added this to match your flow
    else: # student role
        return redirect(url_for('student_dashboard')) # MODIFIED: Explicitly redirect to student_dashboard

@app.route('/teacher-dashboard')
@login_required
def teacher_dashboard():
    if current_user.role != 'teacher':
        return redirect(url_for('index')) # MODIFIED: Use url_for('index')
    return render_template('teacher_dashboard.html')

# API Routes for student progress
@app.route('/api/student/progress', methods=['GET'])
@login_required
def get_student_progress():
    progress = LessonProgress.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'lesson_number': p.lesson_number,
        'completion_percentage': p.completion_percentage,
        'time_spent': p.time_spent
    } for p in progress])

@app.route('/api/student/recordings', methods=['GET'])
@login_required
def get_student_recordings():
    recordings = PronunciationRecording.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'lesson_number': r.lesson_number,
        'exercise_id': r.exercise_id,
        'recording_path': r.recording_path,
        'recorded_at': r.recorded_at.isoformat(),
        'teacher_feedback': r.teacher_feedback,
        'score': r.score
    } for r in recordings])

@app.route('/api/student/stats', methods=['GET'])
@login_required
def get_student_stats():
    stats = StudentStats.query.filter_by(user_id=current_user.id).first()
    if not stats:
        stats = StudentStats(user_id=current_user.id)
        db.session.add(stats)
        db.session.commit()
        
    return jsonify({
        'total_exercises': stats.total_exercises_completed,
        'correct_answers': stats.correct_answers,
        'incorrect_answers': stats.incorrect_answers,
        'accuracy_rate': stats.accuracy_rate,
        'total_recordings': stats.total_recordings,
        'average_score': stats.average_score
    })

# Serve static files from the root directory
# This route handles the initial entry point and redirects based on authentication/role
@app.route('/')
def index():
    if current_user.is_authenticated:
        if current_user.role == 'teacher':
            return redirect(url_for('teacher_dashboard'))
        elif current_user.role == 'admin':
            return redirect(url_for('admin_dashboard'))
        else: # student role
            return redirect(url_for('student_dashboard')) # MODIFIED: Explicitly redirect to student_dashboard
    return redirect(url_for('login'))

# This route serves the main lesson interface (the one with the sphere and "Comenzar Curso")
# The "IR A CURSO" button on student_dashboard.html should link to /index.html
@app.route('/index.html')
@login_required
def serve_lesson_interface():
    # It's generally better to use render_template for HTML files in the templates folder
    # send_from_directory('.', 'index.html') works if index.html is in the root, but render_template is Flask's standard
    return render_template('index.html') # MODIFIED: Changed to render_template for standard practice

# Serve static files from the root directory
# Removed the commented out /<path:path> route as it can cause issues with other routes
# If you need to serve other static files from the root, ensure this doesn't conflict with specific routes.
# @app.route('/<path:path>')
# def serve_static(path):
#     try:
#         return send_from_directory('.', path)
#     except Exception as e:
#         return str(e), 404

# API Routes
@app.route('/api/lessons', methods=['GET'])
@login_required
def get_lessons():
    lessons = [
        {"id": 1, "title": "El Tiempo Presente del Verbo BE"},
        {"id": 2, "title": "Artículos y Plurales"},
        {"id": 3, "title": "Preposiciones IN, ON, y Números"},
        {"id": 4, "title": "There is/are y Demostrativos"},
        {"id": 5, "title": "Preposición OF y Adjetivos Posesivos"},
        {"id": 6, "title": "La Palabra HOME y El Gerundio"},
        {"id": 7, "title": "Preposición FOR y Futuro Idiomático"},
        {"id": 8, "title": "Días y Forma Posesiva"},
        {"id": 9, "title": "El Verbo DO y El Imperativo"},
        {"id": 10, "title": "El Verbo HAVE y Expresiones"}
    ]
    return jsonify(lessons)

@app.route('/admin-dashboard')
@login_required
def admin_dashboard():
    if current_user.role != 'admin':
        return redirect(url_for('index')) # MODIFIED: Use url_for('index')
    return render_template('admin_dashboard.html')

@app.route('/api/admin/dashboard-data')
@login_required
def admin_dashboard_data():
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Get total students
    total_students = User.query.filter_by(role='student').count()
    
    # Get completed lessons
    completed_lessons = LessonProgress.query.filter(
        LessonProgress.completion_percentage == 100
    ).count()
    
    # Get active users today
    today = datetime.utcnow().date()
    active_users = User.query.filter(
        User.last_active >= today,
        User.role == 'student'
    ).count()
    
    # Get average score
    avg_score = db.session.query(
        db.func.avg(StudentStats.average_score)
    ).scalar() or 0
    
    # Get student list with progress
    students = User.query.filter_by(role='student').all()
    student_list = []
    for student in students:
        progress = LessonProgress.query.filter_by(user_id=student.id).all()
        avg_progress = sum([p.completion_percentage for p in progress]) / len(progress) if progress else 0
        student_list.append({
            'id': student.id,
            'name': student.name,
            'email': student.email,
            'progress': avg_progress,
            'lastActive': student.last_active.isoformat() if student.last_active else None
        })
    
    # Get recent activity
    recent_activity = []
    # Exercise attempts
    attempts = ExerciseAttempt.query.order_by(
        ExerciseAttempt.attempt_date.desc()
    ).limit(10).all()
    for attempt in attempts:
        user = User.query.get(attempt.user_id)
        recent_activity.append({
            'user': user.name,
            'action': f'Completó ejercicio en lección {attempt.lesson_number}',
            'timestamp': attempt.attempt_date.isoformat()
        })
    
    # Recordings
    recordings = PronunciationRecording.query.order_by(
        PronunciationRecording.recorded_at.desc()
    ).limit(10).all()
    for recording in recordings:
        user = User.query.get(recording.user_id)
        recent_activity.append({
            'user': user.name,
            'action': f'Grabó pronunciación en lección {recording.lesson_number}',
            'timestamp': recording.recorded_at.isoformat()
        })
    
    # Sort by timestamp
    recent_activity.sort(key=lambda x: x['timestamp'], reverse=True)
    recent_activity = recent_activity[:10]
    
    return jsonify({
        'totalStudents': total_students,
        'completedLessons': completed_lessons,
        'activeUsers': active_users,
        'averageScore': round(avg_score, 1),
        'students': student_list,
        'recentActivity': recent_activity
    })

@app.route('/api/admin/export-students')
@login_required
def export_students():
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Create CSV in memory
    si = StringIO()
    cw = csv.writer(si)
    
    # Write headers
    cw.writerow(['ID', 'Nombre', 'Email', 'Lección Actual', 'Tiempo Total de Estudio', 
                  'Ejercicios Completados', 'Porcentaje de Aciertos', 'Última Actividad'])
    
    # Write student data
    students = User.query.filter_by(role='student').all()
    for student in students:
        stats = StudentStats.query.filter_by(user_id=student.id).first()
        cw.writerow([
            student.id,
            student.name,
            student.email,
            student.current_lesson,
            f"{student.total_study_time} minutos" if student.total_study_time else "0 minutos",
            stats.total_exercises_completed if stats else 0,
            f"{stats.accuracy_rate:.1f}%" if stats else "0%",
            student.last_active.strftime('%Y-%m-%d %H:%M:%S') if student.last_active else "Nunca"
        ])
    
    output = si.getvalue()
    si.close()
    
    return output, 200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=estudiantes.csv'
    }

@app.route('/api/admin/student/<int:student_id>/details')
@login_required
def admin_student_details(student_id):
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    student = User.query.get_or_404(student_id)
    stats = StudentStats.query.filter_by(user_id=student_id).first()
    progress = LessonProgress.query.filter_by(user_id=student_id).all()
    analytics = Analytics.query.filter_by(user_id=student_id).order_by(Analytics.date.desc()).limit(30).all()
    
    # Get exercise attempts
    attempts = ExerciseAttempt.query.filter_by(user_id=student_id).order_by(
        ExerciseAttempt.attempt_date.desc()
    ).limit(50).all()
    
    # Get recordings
    recordings = PronunciationRecording.query.filter_by(user_id=student_id).order_by(
        PronunciationRecording.recorded_at.desc()
    ).limit(50).all()
    
    return jsonify({
        'student': {
            'id': student.id,
            'name': student.name,
            'email': student.email,
