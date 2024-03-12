from flask import Blueprint, jsonify
from app.db import mongo

project_bp = Blueprint('project_routes', __name__, url_prefix='/project')

@project_bp.route('/')
def index():
    return jsonify({'message': 'Hello, World!'})


@projec