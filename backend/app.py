import os
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from backend.core import api
from backend.extensions import db
from backend.config import Config
from backend.models import RevokedToken

def create_app(config=Config):
    app = Flask(__name__, template_folder='../build', static_folder='../build')

    CORS(app)
    app.config.from_object(config)

    register_extensions(app)

    with app.app_context():
        db.create_all()

    return app

def register_extensions(app):
    api.init_app(app)
    db.init_app(app)
    jwt = JWTManager(app)

    @app.route("/")
    def serve():
        return send_from_directory(app.static_folder, "index.html")

    @app.route("/<path>")
    def static_proxy(path):
        """static folder serve"""
        file_name = path.split("/")[-1]
        dir_name = os.path.join(app.static_folder, "/".join(path.split("/")[:-1]))
        return send_from_directory(dir_name, file_name)

    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        jti = decrypted_token['jti']

        return RevokedToken.is_jti_blacklisted(jti)

    @app.errorhandler(404)
    def not_found(e):
        if request.path.startswith("/api/"):
            return jsonify(status="error", message="{}".format(e)), 404
        return send_from_directory(app.static_folder, "index.html")

    @app.errorhandler(405)
    def not_found(e):
        if request.path.startswith("/api/"):
            return jsonify(status="error", message="{}".format(e)), 405
        return send_from_directory(app.static_folder, "index.html")

