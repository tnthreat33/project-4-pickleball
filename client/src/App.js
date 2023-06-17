import React, { useState, useEffect } from 'react';
import { Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import './App.css';
import Home from './Home';
import Courts from './Courts';
import NewCourtForm from './NewCourtForm';
import Reservations from './Reservations';

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
    <div className="App">
    <NavBar/>
     
        <Switch>
          <Route exact path="/">
            <Home courts = {courts}/>
          </Route>
          <Route exact path="/courts">
            <Courts courts={courts} addCourt = {handleAddCourt} setCourts = {setCourts}/>
          </Route>
          <Route exact path="/new-court">
            <NewCourtForm addCourt = {handleAddCourt}/>
          </Route>
          <Route exact path="/reservations">
            <Reservations courts={courts}/>
          </Route>
          <Route exact path="/new-reservation">
            <NewCourtForm addCourt = {handleAddCourt}/>
          </Route>
        </Switch>
      </div>
    
  );
}

export default App;

