#!/usr/bin/env python3

from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from models import Card, KeywordMap, ColorMap

from config import app, db, api

class Cards(Resource):
    
    def get(self):
        card_list = []
        for card in Card.query.all():
            card_list.append(card.to_dict(rules=('-keyword_map.card_id', '-keyword_map.id',
                                                 '-color_map.card_id', '-color_map.id')))

        return make_response(card_list, 200)
    
api.add_resource(Cards, '/cards')

if __name__ == '__main__':
    app.run(port=5555, debug=True)