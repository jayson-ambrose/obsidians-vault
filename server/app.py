#!/usr/bin/env python3

from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from models import Card, KeywordMap, ColorMap, User

from config import app, db, api

class Login(Resource):

    def post(self):
        req_data = request.get_json()
        user = User.query.filter(User.username == req_data['username']).first()       
        
        try:
            if user.auth(req_data['password']) == False:
                return make_response({"error":"wrong password"}, 401) 
                      
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        
        except:
            return make_response( {'error': '401 user not found'}, 404)


class Users(Resource):

    def get(self):
        user_list = []
        for user in User.query.all():
            user_list.append(user.to_dict(rules=('-cards', '-collected_cards')))

        return make_response(user_list, 200)
    
class UsersById(Resource):

    def get(self, id):
        user = User.query.filter(User.id == id).one_or_none()
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({'error':'404: user not found'}, 404)

class Cards(Resource):
    
    def get(self):
        card_list = []
        for card in Card.query.all():
            card_list.append(card.to_dict())

        return make_response(card_list, 200)
    
api.add_resource(Cards, '/cards')
api.add_resource(Users, '/users')
api.add_resource(UsersById, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)