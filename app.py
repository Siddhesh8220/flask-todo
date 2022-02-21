from flask import Flask, jsonify, make_response,render_template
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate

from models.Todo import db
from routes.todo_bp import todo_bp

app = Flask(__name__)
app.config.from_object('config')

#enable cors
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

app.register_blueprint(todo_bp, url_prefix='/todos')

@app.errorhandler(404) 
def invalid_route(e): 
    return jsonify({'errorCode' : 404, 'message' : 'Route not found'})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.debug = True
    app.run()

