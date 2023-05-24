import './styles/App.css';
import Nav from './components/Nav'
import Login from './components/Login'
import Discover from './components/Discover';
import Rules from './components/Rules'
import Library from './components/Library';
import AdminPanel from './components/AdminPanel';
import { Switch, Route } from 'react-router-dom'


function App() {
  return (
    <div>
      <h2>Obsidian's Vault</h2>
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
        <Route exact path='/admin'>
          <AdminPanel />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
