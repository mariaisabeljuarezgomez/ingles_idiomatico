from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(engine_options={
    'pool_pre_ping': True,
    'pool_recycle': 300,
    'pool_timeout': 30,
    'max_overflow': 5,
    'pool_size': 5,
    'connect_args': {
        'connect_timeout': 10
    }
}) 