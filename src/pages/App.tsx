import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Footer from '../components/Footer';
import Header from '../components/Header';


function App() {

  return (
    <div className="App">
      {/* <Header className="Header" /> */}
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/:shortId' component={Home} />
      </Switch>
      {/* <Footer className="Footer" /> */}
    </div>
  );
}

export default App;
