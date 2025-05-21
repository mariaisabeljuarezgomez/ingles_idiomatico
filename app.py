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

# Import db from extensions first
from extensions import db

# Then import models after db is defined
from models import User, LessonProgress, ExerciseAttempt, PronunciationRecording, StudentStats, Analytics, TeacherFeedback
from config import config

app = Flask(__name__, static_folder='static')
app.config.from_object(config[os.getenv('FLASK_ENV', 'production')])
config[os.getenv('FLASK_ENV', 'production')].init_app(app)

# Ensure secret key is set
if not app.secret_key:
    app.secret_key = os.urandom(24)

# Initialize extensions
CORS(app)
csrf = CSRFProtect(app)
db.init_app(app)
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
        return redirect(url_for('dashboard'))
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
        return jsonify({'success': True})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/login', methods=['GET', 'POST'])
def login():
    try:
        if current_user.is_authenticated:
            return redirect(url_for('dashboard'))
        
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
                    return redirect(url_for('dashboard'))
                except Exception as e:
                    app.logger.error(f"Login error for user {email}: {str(e)}")
                    db.session.rollback()
                    flash('An error occurred during login. Please try again.')
            else:
                flash('Invalid email or password')
            return redirect(url_for('login'))
        
        return render_template('login.html')
    except Exception as e:
        app.logger.error(f"Unexpected error in login route: {str(e)}")
        flash('An unexpected error occurred. Please try again later.')
        return redirect(url_for('login'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.role == 'teacher':
        return redirect('/teacher-dashboard')
    return redirect('/')

@app.route('/teacher-dashboard')
@login_required
def teacher_dashboard():
    if current_user.role != 'teacher':
        return redirect('/')
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
@app.route('/')
def index():
    if current_user.is_authenticated:
        if current_user.role == 'teacher':
            return redirect(url_for('teacher_dashboard'))
        elif current_user.role == 'admin':
            return redirect(url_for('admin_dashboard'))
        else:
            return redirect(url_for('student_dashboard'))
    return redirect(url_for('login'))

@app.route('/<path:path>')
def serve_static(path):
    try:
        return send_from_directory('.', path)
    except Exception as e:
        return str(e), 404

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
        return redirect('/')
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
            'currentLesson': student.current_lesson,
            'totalStudyTime': student.total_study_time,
            'lastActive': student.last_active.isoformat() if student.last_active else None
        },
        'stats': {
            'totalExercises': stats.total_exercises_completed,
            'correctAnswers': stats.correct_answers,
            'incorrectAnswers': stats.incorrect_answers,
            'accuracyRate': stats.accuracy_rate,
            'totalRecordings': stats.total_recordings,
            'averageScore': stats.average_score,
            'currentStreak': stats.current_streak,
            'longestStreak': stats.longest_streak,
            'pronunciationScore': stats.pronunciation_score,
            'grammarScore': stats.grammar_score,
            'vocabularyScore': stats.vocabulary_score,
            'challengingTopics': stats.challenging_topics,
            'strongTopics': stats.strong_topics
        } if stats else {},
        'progress': [{
            'lessonNumber': p.lesson_number,
            'completionPercentage': p.completion_percentage,
            'timeSpent': p.time_spent,
            'startedAt': p.started_at.isoformat(),
            'completedAt': p.completed_at.isoformat() if p.completed_at else None
        } for p in progress],
        'analytics': [{
            'date': a.date.isoformat(),
            'studyTime': a.study_time,
            'exercisesCompleted': a.exercises_completed,
            'correctAnswers': a.correct_answers,
            'recordingsMade': a.recordings_made,
            'lessonProgress': a.lesson_progress
        } for a in analytics],
        'recentAttempts': [{
            'lessonNumber': a.lesson_number,
            'exerciseId': a.exercise_id,
            'isCorrect': a.is_correct,
            'timeTaken': a.time_taken,
            'attemptDate': a.attempt_date.isoformat()
        } for a in attempts],
        'recentRecordings': [{
            'lessonNumber': r.lesson_number,
            'exerciseId': r.exercise_id,
            'recordingPath': r.recording_path,
            'teacherFeedback': r.teacher_feedback,
            'score': r.score,
            'recordedAt': r.recorded_at.isoformat()
        } for r in recordings]
    })

@app.route('/api/teacher/dashboard-data')
@login_required
def teacher_dashboard_data():
    if current_user.role != 'teacher':
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Get total assigned students
    total_students = current_user.get_student_count()
    
    # Get average progress of all students
    average_progress = current_user.get_average_student_progress()
    
    # Get pending feedback count
    pending_feedback = PronunciationRecording.query.join(User).filter(
        User.id.in_([s.id for s in current_user.assigned_students]),
        PronunciationRecording.teacher_feedback.is_(None)
    ).count()
    
    # Get average score of all students
    total_score = 0
    student_count = 0
    for student in current_user.assigned_students:
        stats = StudentStats.query.filter_by(user_id=student.id).first()
        if stats and stats.average_score:
            total_score += stats.average_score
            student_count += 1
    average_score = total_score / student_count if student_count > 0 else 0
    
    # Get student list with progress
    students = []
    for student in current_user.assigned_students:
        progress = LessonProgress.query.filter_by(user_id=student.id).all()
        avg_progress = sum([p.completion_percentage for p in progress]) / len(progress) if progress else 0
        students.append({
            'id': student.id,
            'name': student.name,
            'email': student.email,
            'currentLesson': student.current_lesson,
            'progress': avg_progress,
            'lastActive': student.last_active.isoformat() if student.last_active else None
        })
    
    # Get recent feedback
    recent_feedback = TeacherFeedback.query.filter_by(teacher_id=current_user.id).order_by(
        TeacherFeedback.created_at.desc()
    ).limit(5).all()
    
    feedback_list = []
    for feedback in recent_feedback:
        student = User.query.get(feedback.student_id)
        feedback_list.append({
            'studentName': student.name,
            'lessonNumber': feedback.lesson_number,
            'feedbackText': feedback.feedback_text,
            'createdAt': feedback.created_at.isoformat()
        })
    
    # Get pending recordings
    pending_recordings = PronunciationRecording.query.join(User).filter(
        User.id.in_([s.id for s in current_user.assigned_students]),
        PronunciationRecording.teacher_feedback.is_(None)
    ).order_by(PronunciationRecording.recorded_at.desc()).limit(10).all()
    
    recordings_list = []
    for recording in pending_recordings:
        student = User.query.get(recording.user_id)
        recordings_list.append({
            'id': recording.id,
            'studentName': student.name,
            'lessonNumber': recording.lesson_number,
            'exerciseId': recording.exercise_id,
            'recordedAt': recording.recorded_at.isoformat()
        })
    
    return jsonify({
        'totalStudents': total_students,
        'averageProgress': average_progress,
        'pendingFeedback': pending_feedback,
        'averageScore': average_score,
        'students': students,
        'recentFeedback': feedback_list,
        'pendingRecordings': recordings_list
    })

@app.route('/api/teacher/student/<int:student_id>/details')
@login_required
def teacher_student_details(student_id):
    if current_user.role != 'teacher':
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Check if student is assigned to this teacher
    student = User.query.get_or_404(student_id)
    if student not in current_user.assigned_students:
        return jsonify({'error': 'Student not assigned to this teacher'}), 403
    
    # Get student stats
    stats = StudentStats.query.filter_by(user_id=student_id).first()
    
    # Get lesson progress
    progress = LessonProgress.query.filter_by(user_id=student_id).all()
    
    # Get recent recordings
    recordings = PronunciationRecording.query.filter_by(user_id=student_id).order_by(
        PronunciationRecording.recorded_at.desc()
    ).limit(10).all()
    
    # Get exercise attempts
    attempts = ExerciseAttempt.query.filter_by(user_id=student_id).order_by(
        ExerciseAttempt.attempt_date.desc()
    ).limit(10).all()
    
    return jsonify({
        'student': {
            'id': student.id,
            'name': student.name,
            'email': student.email,
            'currentLesson': student.current_lesson,
            'lastActive': student.last_active.isoformat() if student.last_active else None
        },
        'stats': {
            'totalExercises': stats.total_exercises_completed if stats else 0,
            'correctAnswers': stats.correct_answers if stats else 0,
            'incorrectAnswers': stats.incorrect_answers if stats else 0,
            'accuracyRate': stats.accuracy_rate if stats else 0,
            'totalRecordings': stats.total_recordings if stats else 0,
            'averageScore': stats.average_score if stats else 0
        },
        'progress': [{
            'lessonNumber': p.lesson_number,
            'completionPercentage': p.completion_percentage,
            'timeSpent': p.time_spent,
            'startedAt': p.started_at.isoformat(),
            'completedAt': p.completed_at.isoformat() if p.completed_at else None
        } for p in progress],
        'recordings': [{
            'id': r.id,
            'lessonNumber': r.lesson_number,
            'exerciseId': r.exercise_id,
            'recordedAt': r.recorded_at.isoformat(),
            'score': r.score,
            'feedback': r.teacher_feedback
        } for r in recordings],
        'attempts': [{
            'lessonNumber': a.lesson_number,
            'exerciseId': a.exercise_id,
            'isCorrect': a.is_correct,
            'attemptDate': a.attempt_date.isoformat(),
            'timeTaken': a.time_taken
        } for a in attempts]
    })

@app.route('/api/teacher/recording/<int:recording_id>/feedback', methods=['POST'])
@login_required
def submit_recording_feedback(recording_id):
    if current_user.role != 'teacher':
        return jsonify({'error': 'Unauthorized'}), 403
    
    recording = PronunciationRecording.query.get_or_404(recording_id)
    
    # Check if student is assigned to this teacher
    if recording.user not in current_user.assigned_students:
        return jsonify({'error': 'Student not assigned to this teacher'}), 403
    
    data = request.get_json()
    
    # Create feedback record
    feedback = TeacherFeedback(
        teacher_id=current_user.id,
        student_id=recording.user_id,
        lesson_number=recording.lesson_number,
        exercise_id=recording.exercise_id,
        feedback_text=data.get('feedback'),
        feedback_type='pronunciation',
        score=data.get('score')
    )
    
    # Update recording
    recording.teacher_feedback = data.get('feedback')
    recording.score = data.get('score')
    
    try:
        db.session.add(feedback)
        db.session.commit()
        return jsonify({'success': True})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/teacher/export-student-report/<int:student_id>')
@login_required
def export_student_report(student_id):
    if current_user.role != 'teacher':
        return jsonify({'error': 'Unauthorized'}), 403
    
    student = User.query.get_or_404(student_id)
    if student not in current_user.assigned_students:
        return jsonify({'error': 'Student not assigned to this teacher'}), 403
    
    # Create CSV in memory
    si = StringIO()
    cw = csv.writer(si)
    
    # Write headers
    cw.writerow(['Reporte de Progreso del Estudiante'])
    cw.writerow(['Nombre:', student.name])
    cw.writerow(['Email:', student.email])
    cw.writerow(['Lección Actual:', student.current_lesson])
    cw.writerow([])
    
    # Write progress data
    cw.writerow(['Progreso por Lección'])
    cw.writerow(['Lección', 'Porcentaje Completado', 'Tiempo Dedicado', 'Fecha de Inicio', 'Fecha de Finalización'])
    
    progress = LessonProgress.query.filter_by(user_id=student_id).all()
    for p in progress:
        cw.writerow([
            p.lesson_number,
            f"{p.completion_percentage}%",
            f"{p.time_spent} minutos",
            p.started_at.strftime('%Y-%m-%d'),
            p.completed_at.strftime('%Y-%m-%d') if p.completed_at else 'En progreso'
        ])
    
    cw.writerow([])
    
    # Write exercise attempts
    cw.writerow(['Intentos de Ejercicios'])
    cw.writerow(['Lección', 'Ejercicio', 'Resultado', 'Tiempo', 'Fecha'])
    
    attempts = ExerciseAttempt.query.filter_by(user_id=student_id).order_by(
        ExerciseAttempt.attempt_date.desc()
    ).limit(50).all()
    
    for a in attempts:
        cw.writerow([
            a.lesson_number,
            a.exercise_id,
            'Correcto' if a.is_correct else 'Incorrecto',
            f"{a.time_taken} segundos",
            a.attempt_date.strftime('%Y-%m-%d %H:%M')
        ])
    
    output = si.getvalue()
    si.close()
    
    return output, 200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': f'attachment; filename=reporte_{student.name.replace(" ", "_")}.csv'
    }

@app.route('/reset_password_request', methods=['GET', 'POST'])
def reset_password_request():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        email = request.form.get('email')
        user = User.query.filter_by(email=email).first()
        
        if user and mail:  # Only send email if mail is configured
            # Generate a simple token (temporary solution)
            token = os.urandom(16).hex()
            reset_url = url_for('reset_password', token=token, _external=True)
            
            msg = Message('Password Reset Request',
                         sender=app.config['MAIL_USERNAME'],
                         recipients=[user.email])
            msg.body = f'''Para restablecer tu contraseña, visita el siguiente enlace:
{reset_url}

Si no solicitaste un restablecimiento de contraseña, ignora este mensaje.
'''
            try:
                mail.send(msg)
                flash('Se han enviado instrucciones a tu correo electrónico.')
            except Exception as e:
                flash('Error al enviar el correo. Por favor intenta más tarde.')
                app.logger.error(f"Error sending email: {str(e)}")
        else:
            if not mail:
                flash('El servicio de correo no está configurado. Por favor contacta al administrador.')
            else:
                flash('No se encontró una cuenta con ese correo electrónico.')
        return redirect(url_for('login'))
        
    return render_template('reset_password.html')

@app.route('/test_email')
@login_required
def test_email():
    if not mail:
        return jsonify({'error': 'Email not configured'}), 500
    
    try:
        msg = Message('Test Email',
                     sender=app.config['MAIL_USERNAME'],
                     recipients=[current_user.email])
        msg.body = 'This is a test email from Inglés Idiomático.'
        mail.send(msg)
        return jsonify({'success': True, 'message': 'Test email sent successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/student-dashboard')
@login_required
def student_dashboard():
    if current_user.role != 'student':
        return redirect(url_for('index'))
    return render_template('student_dashboard.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Create tables for new models if they don't exist
        if not db.engine.dialect.has_table(db.engine, 'progress'):
            Progress.__table__.create(db.engine)
        if not db.engine.dialect.has_table(db.engine, 'analytics'):
            Analytics.__table__.create(db.engine)
            
        # Add last_active column to user table if it doesn't exist
        inspector = db.inspect(db.engine)
        if 'last_active' not in [c['name'] for c in inspector.get_columns('user')]:
            with db.engine.connect() as conn:
                conn.execute(db.text('ALTER TABLE user ADD COLUMN last_active DATETIME'))
                
    app.run(debug=True) 