from flask_restful import Api

api = Api(prefix="/api")

# Importing each route
from .User import *