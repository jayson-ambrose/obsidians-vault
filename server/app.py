#!/usr/bin/env python3

from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from models import Card, KeywordMap, ColorMap, User

from config import app, db, api

app.secret_key = 'j2s4o95KA6teyPY17iUoeTBnAteyS2Pafddyhj3fDRN3oVQ2daf'

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
        
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()

class Users(Resource):

    def get(self):
        user_list = []
        for user in User.query.all():
            user_list.append(user.to_dict(rules=('-cards', '-collected_cards')))

        return make_response(user_list, 200)
    
    def post(self):
        req_data = request.get_json()
        if req_data['password'] != req_data['re_password']:
            return make_response({'error':'401: Passwords do not match.'}, 401)
        
        new_user = User(username=req_data.get('username'), 
                        password=req_data.get('password'), 
                        admin=False,
                        master_account=False)
        
        try:

            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id

            return make_response(new_user.to_dict(), 201)
        
        except IntegrityError:

            db.session.rollback()
            return make_response({'error': '400: Failed to create user account.'})
    
class UsersById(Resource):

    def get(self, id):
        user = User.query.filter(User.id == id).one_or_none()
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({'error':'404: user not found'}, 404)
    
    def patch(self, id):
        user = User.query.filter(User.id == id).one_or_none()
        req_data = request.get_json()

        if user:
            for key in req_data:
                setattr(user, key, req_data[key])
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(rules=('-cards', '-collected_cards')), 200)

class Cards(Resource):
    
    def get(self):
        card_list = []
        for card in Card.query.all():
            card_list.append(card.to_dict())

        return make_response(card_list, 200)
    
api.add_resource(Cards, '/cards')
api.add_resource(Users, '/users')
api.add_resource(UsersById, '/users/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)