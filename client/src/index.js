import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import {RecoilRoot} from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>
);
