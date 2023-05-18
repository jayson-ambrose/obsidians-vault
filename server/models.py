from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Card(db.Model, SerializerMixin):
    __tablename__ = 'cards'

    serialize_rules = ('-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String)
    cost = db.Column(db.Integer)
    img_url = db.Column(db.String)
    text = db.Column(db.Text)

    keyword_map = db.relationship('KeywordMap', uselist= False, backref='card', cascade='all, delete-orphan')
    color_map = db.relationship('ColorMap', uselist= False, backref='card', cascade='all, delete-orphan')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def buildKeyWordMap(self,
                        n_cancel=False, 
                        n_collect=False, 
                        n_destroy=False ,
                        n_discarded=False, 
                        n_draw=False, 
                        n_expansion=False, 
                        n_remove=False, 
                        n_renews=False):

        new_map = KeywordMap(cancel=n_cancel, collect=n_collect, destroy=n_destroy,
                             discarded=n_discarded, draw=n_draw, expansion=n_expansion,
                             remove=n_remove, renews=n_renews, card=self)
        
        try:
            db.session.add(new_map)
            db.session.commit()

        except ValueError:
            print('failed to add KeywordMap')


    def buildColorMap(self, 
                      n_red=False, 
                      n_blue=False, 
                      n_green=False, 
                      n_purple=False):

        new_map = ColorMap(red=n_red, blue=n_blue, green=n_green, purple=n_purple, card=self)
        
        try:
            db.session.add(new_map)
            db.session.commit()

        except ValueError:
            print('failed to add ColorMap')

class KeywordMap(db.Model, SerializerMixin):
    __tablename__ = 'keyword_maps'

    serialize_rules = ('-card', '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    cancel = db.Column(db.Boolean)
    collect = db.Column(db.Boolean)
    destroy = db.Column(db.Boolean)
    discarded = db.Column(db.Boolean)
    draw = db.Column(db.Boolean)
    expansion = db.Column(db.Boolean)
    remove = db.Column(db.Boolean)
    renews = db.Column(db.Boolean)

    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

class ColorMap (db.Model, SerializerMixin):
    __tablename__ = 'color_maps'

    serialize_rules = ('-card', '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    red = db.Column(db.Boolean)
    blue = db.Column(db.Boolean)
    green = db.Column(db.Boolean)
    purple = db.Column(db.Boolean)

    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())