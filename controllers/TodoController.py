import logging
from flask import request,jsonify, make_response
from models.Todo import Todo
from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()

def index():
    try:
        todos = Todo.query.all()
        response = make_response(jsonify([i.serialize for i in todos]))                                           
        response.headers['Content-Type'] = 'text/json; charset=utf-8' 
        return response, 200
    except Exception as e:
        response = make_response(jsonify(message=f'{e}'))
        return response, 422

def store():
    try:
        data = request.get_json()
        if data["description"] != "":
            generated_id = f"{uuid.uuid4()}"
            todo = Todo(id = generated_id ,description = data["description"],iscomplete = data["iscomplete"])
            db.session.add(todo)
            db.session.commit()
            response = make_response(jsonify(todo.serialize))                                           
            response.headers['Content-Type'] = 'text/json; charset=utf-8' 
            return response, 200
    except Exception as e:
        response = make_response(jsonify(message=f'{e}'))
        return response, 500
    

def show(todoId):
    try:
        todo = db.session.query(Todo).filter_by(id=todoId).first()
        db.session.commit()
        response = make_response(jsonify(todo.serialize))                                           
        response.headers['Content-Type'] = 'text/json; charset=utf-8' 
        return response, 200  
    except Exception as e:
        response = make_response(jsonify(message=f'{e}'))
        return response, 404


def update(todoId):
    try:
        data = request.get_json()
        if data["description"] != "":
            todo = db.session.query(Todo).filter_by(id=todoId).first()
            todo.description = data["description"]
            todo.iscomplete = data["iscomplete"]
            db.session.commit()
            response = make_response(jsonify(todo.serialize))                                           
            response.headers['Content-Type'] = 'text/json; charset=utf-8' 
            return response, 200
    except Exception as e:
        response = make_response(jsonify(message='Not found'))
        return response, 404



def delete(todoId):
    try:
        db.session.query(Todo).filter_by(id=todoId).delete()
        db.session.commit()
        response = make_response(jsonify(message='deleted successfully'))                                           
        response.headers['Content-Type'] = 'text/json; charset=utf-8' 
        return response, 200
    except Exception:
        response = make_response(jsonify(message='Not found'))
        return response, 404


