from flask.cli import FlaskGroup
from app import app
from extensions import db
from flask_migrate import Migrate

cli = FlaskGroup(app)
migrate = Migrate(app, db)

@cli.command("create_db")
def create_db():
    """Creates a fresh database"""
    db.drop_all()
    db.create_all()
    db.session.commit()

@cli.command("init_db")
def init_db():
    """Initialize the database and create all tables"""
    db.create_all()
    db.session.commit()

@cli.command("drop_db")
def drop_db():
    """Drop all tables"""
    db.drop_all()

if __name__ == "__main__":
    cli() 