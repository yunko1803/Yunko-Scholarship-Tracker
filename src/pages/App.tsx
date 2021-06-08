import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';


function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/:shortId' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
