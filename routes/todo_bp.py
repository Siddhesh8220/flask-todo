from flask import Blueprint
from controllers.TodoController import index, store, show, update, delete
todo_bp = Blueprint('todo_bp', __name__)
todo_bp.route('/', methods=['GET'])(index)
todo_bp.route('/create', methods=['POST'])(store)
todo_bp.route('/<string:todoId>', methods=['GET'])(show)
todo_bp.route('/<string:todoId>/edit', methods=['PUT'])(update)
todo_bp.route('/<string:todoId>', methods=['DELETE'])(delete)