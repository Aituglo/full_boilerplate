import os


class Config(object):
    DEBUG = True
    TESTING = True

    SECRET_KEY = 'change me please'
    SECURITY_PASSWORD_SALT= 'change me please'
    
    JWT_SECRET_KEY = 'change me please'
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False