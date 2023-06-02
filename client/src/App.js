import React from 'react'
import Nav from './components/Nav'
import Login from './components/Login'
import Discover from './components/Discover';
import Rules from './components/Rules'
import Library from './components/Library';
import AdminPanel from './components/AdminPanel';
import Signup from './components/Signup';
import Account from './components/Account';
import BrowseDecks from './components/BrowseDecks';
import { Switch, Route } from 'react-router-dom'


function App() { 

  return (
    <div className='siteContainer'>
      <div className='banner'>
        <img  alt='' src='https://cdn.imgchest.com/files/6yxkcz6v997.png'/>
      </div>
      <Nav/>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/discover'>
          <Discover />
        </Route>
        <Route exact path='/rules'>
          <Rules />
        </Route>
        <Route exact path='/library'>
          <Library />
        </Route>
        <Route path='/admin'>
          <AdminPanel />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/account'>
          <Account />
        </Route>
        <Route exact path='/browse'>
          <BrowseDecks />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
