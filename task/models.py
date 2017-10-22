from sqlalchemy import Boolean, Column, SmallInteger, Text
from sqlalchemy.ext.declarative import declarative_base

from flask import Flask
from flask_sqlalchemy import SQLAlchemy as flask_sqlalchemy
import flask_restless


Base = declarative_base()
metadata = Base.metadata


class Task(Base):
    __tablename__ = 'tasks'
    __table_args__ = {'schema': 'tasks'}

    key = Column(SmallInteger, primary_key=True)
    title = Column(Text, nullable=False)
    description = Column(Text)
    done = Column(Boolean, nullable=False)


"""

Flask API

"""


def create_api():
    # Create the Flask application and the Flask-SQLAlchemy object.
    app = Flask(__name__)
    app.config['DEBUG'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ruben:@localhost/ruben'
    db = flask_sqlalchemy(app)

    # Create the database tables. Not necessary this time because they are already created
    # db.create_all()

    # Create the Flask-Restless API manager.
    manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

    # Create API endpoints, which will be available at /api/<tablename> by
    # default. Allowed HTTP methods can be specified as well.
    manager.create_api(Task, methods=['GET', 'POST', 'DELETE', 'PUT'])

    # start the flask loop
    app.run(port=8888)


create_api()
