from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='.')
CORS(app)

# Serve static files from the root directory
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# API Routes
@app.route('/api/lessons', methods=['GET'])
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