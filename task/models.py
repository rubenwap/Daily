# coding: utf-8
from sqlalchemy import Column, Integer, Table, Text
from sqlalchemy.sql.sqltypes import NullType
from sqlalchemy.ext.declarative import declarative_base

from flask import Flask
from flask_sqlalchemy import SQLAlchemy as flask_sqlalchemy
import flask_restless

Base = declarative_base()
metadata = Base.metadata


t_sqlite_sequence = Table(
    'sqlite_sequence', metadata,
    Column('name', NullType),
    Column('seq', NullType)
)


class Task(Base):
    __tablename__ = 'tasks'

    key = Column(Integer, primary_key=True)
    title = Column(Text, nullable=False)
    description = Column(Text)
    done = Column(Integer, nullable=False)


"""

Flask API

"""


def create_api():
    # Create the Flask application and the Flask-SQLAlchemy object.
    app = Flask(__name__)
    app.config['DEBUG'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/task.db'
    db = flask_sqlalchemy(app)

    # Create the database tables. Not necessary this time because they are already created
    # db.create_all()

    # Create the Flask-Restless API manager.
    manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

    # Create API endpoints, which will be available at /api/<tablename> by
    # default. Allowed HTTP methods can be specified as well.
    manager.create_api(Task, methods=['GET', 'POST', 'DELETE', 'PUT'])

    # start the flask loop
    app.run(port=9000)
    # http://localhost:5000/api/tasks


create_api()
