from pickle import FALSE
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.String, primary_key=True)
    description = db.Column(db.String, nullable=False)
    iscomplete = db.Column(db.String, nullable=False)

    def __init__(self, id, description,iscomplete):
        self.id = id
        self.description = description
        self.iscomplete = iscomplete

    def __repr__(self):
        return '<Todo %>' % self.id

    @property
    def serialize(self):
        return {
            'id': self.id,
            'description': self.description,
            'iscomplete': self.iscomplete,
        }