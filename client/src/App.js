import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Courts from './Courts';
import NewCourtForm from './NewCourtForm';

function App() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    fetch("/courts")
      .then((response) => response.json())
      .then((data) => setCourts(data));
  }, []);

  function handleAddCourt(newCourt) {
    setCourts((courts) => [...courts, newCourt]);
  }

  return (
    <Router>
      <div className="App">
        <header>Find Your Pickleball Court</header>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courts">Courts</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/courts">
            <Courts courts={courts} addCourt = {handleAddCourt}/>
          </Route>
          <Route exact path="/new-court">
            <NewCourtForm addCourt = {handleAddCourt}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

