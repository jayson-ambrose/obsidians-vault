#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import datetime

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Card, KeywordMap, ColorMap

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Removing old data...")    

        Card.query.delete()
        KeywordMap.query.delete()
        ColorMap.query.delete()

        db.session.commit()
        
        print("Starting seed...")

        c1 = Card(name='Advanced Notice', 
                  cost=3, 
                  img_url='https://i.imgur.com/zRmMIU1.png', 
                  text='Collect 3. If this card is in your hand at the start of the game, you may play it without paying its cost. Renews')
        
        db.session.add(c1)
        db.session.commit()

        c1.buildKeyWordMap(n_collect=True, n_renews=True)
        c1.buildColorMap(n_blue=True)

        c2 = Card(name='All the Shinies', 
                  cost=3, 
                  img_url='https://i.imgur.com/GwJCUmf.png', 
                  text='Collect 5 then discard. Discarded. If this card is on top of your discard pile at the start of your turn, Collect 2.')
        
        db.session.add(c2)
        db.session.commit()

        c2.buildKeyWordMap(n_collect=True, n_discarded=True)
        c2.buildColorMap()

        c3 = Card(name='A Lost Cause', 
                  cost=3, 
                  img_url='https://i.imgur.com/EkV01g4.png', 
                  text='Targe player Discards 2 and Collects 1.')
        
        db.session.add(c3)
        db.session.commit()

        c3.buildKeyWordMap(n_collect=True, n_discarded=True)
        c3.buildColorMap()

        print("Seed complete.")