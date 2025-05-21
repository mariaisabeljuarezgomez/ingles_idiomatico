from flask_migrate import Migrate
from app import app, db

migrate = Migrate(app, db)

"""Add progress tracking and analytics

Revision ID: 1a2b3c4d5e6f
Revises: 
Create Date: 2024-03-19 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSON

# revision identifiers, used by Alembic.
revision = '1a2b3c4d5e6f'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Add last_active column to users table
    op.add_column('user', sa.Column('last_active', sa.DateTime(), nullable=True))

    # Create progress table
    op.create_table('progress',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('lesson_id', sa.Integer(), nullable=False),
        sa.Column('completed', sa.Boolean(), default=False),
        sa.Column('score', sa.Float(), nullable=True),
        sa.Column('completed_at', sa.DateTime(), nullable=True),
        sa.Column('time_spent', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create analytics table
    op.create_table('analytics',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('event_type', sa.String(50), nullable=False),
        sa.Column('event_data', JSON, nullable=True),
        sa.Column('timestamp', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('analytics')
    op.drop_table('progress')
    op.drop_column('user', 'last_active') 