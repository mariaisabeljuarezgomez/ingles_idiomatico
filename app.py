from flask import Flask, send_from_directory, jsonify, render_template, request, redirect, url_for, flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime, timedelta
from flask_mail import Mail, Message
import jwt
import json
from sqlalchemy import func, and_

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'default-secret-key')
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')

# Database configuration - Use PostgreSQL in production (Render) and SQLite in development
database_url = os.environ.get('DATABASE_URL')
if database_url and database_url.startswith('postgres://'):
    # Render provides PostgreSQL URLs starting with postgres://
    database_url = database_url.replace('postgres://', 'postgresql://', 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    # Local development - use SQLite
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
mail = Mail(app)

# User Model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(120))
    role = db.Column(db.String(20), default='student')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_active = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    progress = db.relationship('Progress', backref='user', lazy=True)
    analytics = db.relationship('Analytics', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_reset_token(self, expires_in=600):
        return jwt.encode(
            {'reset_password': self.id, 'exp': datetime.utcnow() + timedelta(seconds=expires_in)},
            app.config['SECRET_KEY'], algorithm='HS256'
        )

    @staticmethod
    def verify_reset_token(token):
        try:
            id = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])['reset_password']
            return User.query.get(id)
        except:
            return None

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lesson_id = db.Column(db.Integer, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    score = db.Column(db.Float)
    completed_at = db.Column(db.DateTime)
    time_spent = db.Column(db.Integer)  # in seconds

class Analytics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_type = db.Column(db.String(50), nullable=False)
    event_data = db.Column(db.JSON)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Authentication routes
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        remember = True if request.form.get('remember-me') else False

        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user, remember=remember)
            return redirect(url_for('dashboard'))
        
        flash('Please check your login details and try again.')
        return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.role == 'admin':
        return redirect(url_for('admin_dashboard'))
    elif current_user.role == 'teacher':
        return redirect(url_for('teacher_dashboard'))
    else:
        return redirect(url_for('student_dashboard'))

@app.route('/admin-dashboard')
@login_required
def admin_dashboard():
    if current_user.role != 'admin':
        return redirect(url_for('dashboard'))
    return render_template('admin_dashboard.html')

@app.route('/teacher-dashboard')
@login_required
def teacher_dashboard():
    if current_user.role != 'teacher':
        return redirect(url_for('dashboard'))
    return render_template('teacher_dashboard.html')

@app.route('/student-dashboard')
@login_required
def student_dashboard():
    if current_user.role != 'student':
        return redirect(url_for('dashboard'))
    return render_template('student_dashboard.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        name = request.form.get('name')
        
        # Check if user already exists
        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email address already exists')
            return redirect(url_for('register'))
        
        # Create new user
        new_user = User(
            email=email,
            name=name,
            role='student',  # Default role is student
            created_at=datetime.utcnow(),
            is_active=True
        )
        new_user.set_password(password)
        
        try:
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user)
            return redirect(url_for('dashboard'))
        except Exception as e:
            db.session.rollback()
            flash('An error occurred. Please try again.')
            return redirect(url_for('register'))
    
    return render_template('register.html')

# Original routes
@app.route('/')
def serve_index():
    return redirect(url_for('login'))

@app.route('/<path:path>')
def serve_static(path):
    try:
        return send_from_directory('.', path)
    except Exception as e:
        return str(e), 404

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

# Password Reset Routes
@app.route('/reset_password_request', methods=['GET', 'POST'])
def reset_password_request():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        email = request.form.get('email')
        user = User.query.filter_by(email=email).first()
        
        if user:
            token = user.get_reset_token()
            reset_url = url_for('reset_password', token=token, _external=True)
            
            msg = Message('Password Reset Request',
                         sender=app.config['MAIL_USERNAME'],
                         recipients=[user.email])
            msg.body = f'''Para restablecer tu contraseña, visita el siguiente enlace:
{reset_url}

Si no solicitaste un restablecimiento de contraseña, ignora este mensaje.
'''
            mail.send(msg)
            flash('Se han enviado instrucciones a tu correo electrónico.')
            return redirect(url_for('login'))
        
        flash('No se encontró una cuenta con ese correo electrónico.')
    return render_template('reset_password.html')

@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    user = User.verify_reset_token(token)
    if not user:
        flash('El enlace es inválido o ha expirado.')
        return redirect(url_for('reset_password_request'))
    
    if request.method == 'POST':
        password = request.form.get('password')
        password2 = request.form.get('password2')
        
        if password != password2:
            flash('Las contraseñas no coinciden.')
            return redirect(url_for('reset_password', token=token))
        
        user.set_password(password)
        db.session.commit()
        flash('Tu contraseña ha sido actualizada.')
        return redirect(url_for('login'))
    
    return render_template('reset_password.html', token=token)

# Analytics Routes
@app.route('/api/analytics/student/<int:student_id>', methods=['GET'])
@login_required
def get_student_analytics(student_id):
    if not current_user.role in ['teacher', 'admin']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    analytics = Analytics.query.filter_by(user_id=student_id).order_by(Analytics.timestamp.desc()).limit(100).all()
    progress = Progress.query.filter_by(user_id=student_id).all()
    
    return jsonify({
        'analytics': [{
            'event_type': a.event_type,
            'event_data': a.event_data,
            'timestamp': a.timestamp.isoformat()
        } for a in analytics],
        'progress': [{
            'lesson_id': p.lesson_id,
            'completed': p.completed,
            'score': p.score,
            'completed_at': p.completed_at.isoformat() if p.completed_at else None,
            'time_spent': p.time_spent
        } for p in progress]
    })

@app.route('/api/analytics/overview', methods=['GET'])
@login_required
def get_analytics_overview():
    if not current_user.role == 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    total_users = User.query.count()
    active_users = User.query.filter(User.last_active >= datetime.utcnow() - timedelta(days=7)).count()
    lesson_completion = db.session.query(
        Progress.lesson_id,
        func.count(Progress.id).label('total_completions')
    ).filter(Progress.completed == True).group_by(Progress.lesson_id).all()
    
    return jsonify({
        'total_users': total_users,
        'active_users': active_users,
        'lesson_completion': [{
            'lesson_id': lc[0],
            'completions': lc[1]
        } for lc in lesson_completion]
    })

# Progress Tracking Routes
@app.route('/api/progress/update', methods=['POST'])
@login_required
def update_progress():
    data = request.get_json()
    lesson_id = data.get('lesson_id')
    completed = data.get('completed', False)
    score = data.get('score')
    time_spent = data.get('time_spent')
    
    progress = Progress.query.filter_by(
        user_id=current_user.id,
        lesson_id=lesson_id
    ).first()
    
    if not progress:
        progress = Progress(
            user_id=current_user.id,
            lesson_id=lesson_id
        )
        db.session.add(progress)
    
    progress.completed = completed
    if score is not None:
        progress.score = score
    if time_spent is not None:
        progress.time_spent = time_spent
    if completed:
        progress.completed_at = datetime.utcnow()
    
    # Track analytics
    analytics = Analytics(
        user_id=current_user.id,
        event_type='lesson_progress',
        event_data={
            'lesson_id': lesson_id,
            'completed': completed,
            'score': score,
            'time_spent': time_spent
        }
    )
    db.session.add(analytics)
    
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/progress', methods=['GET'])
@login_required
def get_progress():
    progress = Progress.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'lesson_id': p.lesson_id,
        'completed': p.completed,
        'score': p.score,
        'completed_at': p.completed_at.isoformat() if p.completed_at else None,
        'time_spent': p.time_spent
    } for p in progress])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True) 