from flask import Flask
from .project_route import project_bp

def register_routes(app: Flask):
    app.register_blueprint(project_bp)