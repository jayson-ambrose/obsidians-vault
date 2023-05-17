from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Card(db.Model, SerializerMixin):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String)
    cost = db.Column(db.Integer)
    img_url = db.Column(db.String)
    text = db.Column(db.Text)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

class KeywordMap(db.Model, SerializerMixin):
    __tablename__ = 'keyword_maps'

    id = db.Column(db.Integer, primary_key=True)
    cancel = db.Column(db.Boolean)
    collect = db.Column(db.Boolean)
    destroy = db.Column(db.Boolean)
    discarded = db.Column(db.Boolean)
    draw = db.Column(db.Boolean)
    expansion = db.Column(db.Boolean)
    remove = db.Column(db.Boolean)
    renews = db.Column(db.Boolean)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

class ColorMap (db.Model, SerializerMixin):
    __tablename__ = 'color_maps'

    id = db.Column(db.Integer, primary_key=True)
    red = db.Column(db.Boolean)
    blue = db.Column(db.Boolean)
    green = db.Column(db.Boolean)
    purple = db.Column(db.Boolean)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())