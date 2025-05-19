# Inglés Idiomático I - Backend

This is the backend server for the Inglés Idiomático I course application.

## Setup

1. Make sure you have Python 3.8 or higher installed
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - Unix/MacOS:
     ```bash
     source venv/bin/activate
     ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

1. Make sure your virtual environment is activated
2. Run the Flask application:
   ```bash
   python app.py
   ```
3. The server will start at `http://localhost:8000`

## API Endpoints

- `GET /api/lessons` - Get list of all lessons
- More endpoints coming soon... 