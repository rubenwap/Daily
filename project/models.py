from sqlalchemy import Boolean, Column, SmallInteger, Text
from sqlalchemy.ext.declarative import declarative_base

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy as flask_sqlalchemy
import flask_restless

import os


Base = declarative_base()
metadata = Base.metadata
app = Flask(__name__)


class Task(Base):
    __tablename__ = 'tasks'
    __table_args__ = {'schema': 'tasks'}

    key = Column(SmallInteger, primary_key=True)
    title = Column(Text, nullable=False)
    done = Column(Boolean, nullable=False)


"""

Flask API

"""


def create_api():
    # Create the Flask application and the Flask-SQLAlchemy object.
    app.config['DEBUG'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://ruben:@localhost/ruben"
    db = flask_sqlalchemy(app)

    # Create the database tables. Not necessary this time because they are already created
    # db.create_all()

    # Create the Flask-Restless API manager.
    manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

    # Create API endpoints, which will be available at /api/<tablename> by
    # default. Allowed HTTP methods can be specified as well.
    manager.create_api(Task, methods=['GET', 'POST', 'DELETE', 'PATCH'])


def create_routes():
    @app.route('/tasks/')
    def all_tasks():
        return render_template('index.html')


def start_app():
    # start the flask loop
    app.run()
