from flask import jsonify, make_response
from flask_jwt_extended import jwt_required, jwt_refresh_token_required, create_access_token, create_refresh_token, get_jwt_identity, get_raw_jwt
from flask_restful import Resource, reqparse
from flask_restful.utils import cors

from backend.extensions import db
from backend.decorators import login_required
from backend.models import User, RevokedToken, to_dict
from passlib.hash import sha256_crypt

import json

class GetAllUser(Resource):
    @login_required
    def get(self):
        try:
            return jsonify([to_dict(user) for user in User.query.all()])
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class GetUser(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('id')

    @login_required
    def get(self):
        try:
            user = get_jwt_identity()

            return jsonify(user)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

    @login_required
    def post(self):
        try:
            args = self.parser.parse_args()

            _id = args['id']

            return jsonify(to_dict(User.query.filter_by(id=_id).first()))
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class Login(Resource):

    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('email', required=True)
    parser.add_argument('password', required=True)

    def post(self):
        try:
            args = self.parser.parse_args()

            email = args['email']
            password = args['password']

            user = User.query.filter_by(email=email).first()

            if user:

                if sha256_crypt.verify(password, user.password):

                    access_token = create_access_token(identity = to_dict(user), expires_delta=False)
                    refresh_token = create_refresh_token(identity = to_dict(user))

                    return jsonify(status="success", access_token=access_token, refresh_token=refresh_token, user=to_dict(user))
                else:
                    return jsonify(status="error", message="app.auth.login_error")
            else:
                return jsonify(status="error", message="app.auth.login_error")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="app.global.error"), 500



class Register(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('username', required=True)
    parser.add_argument('email', required=True)
    parser.add_argument('password', required=True)
    parser.add_argument('firstname', required=True)
    parser.add_argument('lastname', required=True)
    parser.add_argument('language')

    def post(self):
        try:
            args = self.parser.parse_args()

            email = args['email']
            password = sha256_crypt.hash(args['password'])
            username = args['username']
            firstname = args['firstname']
            lastname = args['lastname']
            language = args['language']

            user = User(email=email, username=username, password=password, firstname=firstname, lastname=lastname, language=language)

            try:
                db.session.add(user)
                db.session.commit()
            except Exception as e:
                print(e)
                return jsonify(status="error", message="app.auth.register_error")

            return jsonify(status="success")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="app.auth.register_error")


class Manage(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('username')
    parser.add_argument('email')
    parser.add_argument('password')
    parser.add_argument('verifPassword', required=True)
    parser.add_argument('firstname')
    parser.add_argument('lastname')
    parser.add_argument('language')

    @login_required
    def post(self):
        try:
            args = self.parser.parse_args()
            password = args['password']
            verifPassword = args['verifPassword']

            last_user = get_jwt_identity()

            if sha256_crypt.verify(verifPassword, last_user['password']):

                user = User.query.filter_by(id=last_user['id']).first()

                user.email = args['email']
                user.username = args['username']
                user.firstname = args['firstname']
                user.lastname = args['lastname']
                user.language = args['language']

                if password != '':
                    user.password = sha256_crypt.hash(args['password'])

                db.session.add(user)
                db.session.commit()

                access_token = create_access_token(identity = to_dict(user))
                refresh_token = create_refresh_token(identity = to_dict(user))

                return jsonify(status="success", access_token=access_token, refresh_token=refresh_token)
            else:
                return jsonify(status="error", message="app.auth.password_mismatch")
        except Exception as e:
            return jsonify(status="error", message="app.global.error")

class LogoutAccess(Resource):
    @login_required
    def get(self):
        try:
            jti = get_raw_jwt()['jti']

            revoked_token = RevokedToken(jti = jti)
            revoked_token.add()

            return jsonify(status="success", message="app.auth.logout_success")
        except Exception as e:
            return jsonify(status="error", message="app.global.error")

class LogoutRefresh(Resource):
    @jwt_refresh_token_required
    def get(self):
        try:
            jti = get_raw_jwt()['jti']

            revoked_token = RevokedToken(jti = jti)
            revoked_token.add()

            return jsonify(status="success", message="app.auth.logout_success")
        except Exception as e:
            return jsonify(status="error", message="app.global.error")

class TokenValid(Resource):
    @login_required
    def get(self):
        try:
            user = get_jwt_identity()

            return jsonify(status="success", user=user)
        except ExpiredSignatureError as e:
            return jsonify(status="error", message="app.error.expired_signature")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e))

class Refresh(Resource):
    @jwt_refresh_token_required
    def get(self):
        try:
            user = get_jwt_identity()

            id = user['id']

            new_user = User.query.filter_by(id=id).first()

            return jsonify(status="success", access_token=create_access_token(identity=to_dict(new_user)))
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500
