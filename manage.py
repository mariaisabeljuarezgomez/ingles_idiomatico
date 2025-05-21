from flask.cli import FlaskGroup
from app import app
from extensions import db
from flask_migrate import Migrate, MigrateCommand

cli = FlaskGroup(app)
migrate = Migrate(app, db)

@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

if __name__ == "__main__":
    cli() 