import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Compare from '../Compare';
import Explore from '../Explore';
import Footer from '../Footer';
import Home from '../Home';
import Navbar from '../Navbar';
import RandomTeam from '../RandomTeam';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/compare" exact component={Compare} />
        <Route path="/explore" exact component={Explore} />
        <Route path="/random-team" exact component={RandomTeam} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
