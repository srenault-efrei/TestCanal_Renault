import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './component/Home'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path = '/'>
          <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
