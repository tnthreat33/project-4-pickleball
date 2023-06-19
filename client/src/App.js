import React, { useState, useEffect } from 'react';
import { Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import './App.css';
import Home from './Home';
import Courts from './Courts';
import NewCourtForm from './NewCourtForm';
import Reservations from './Reservations';
import NewReservationForm from './NewReservationForm';
import Login from './Login';

function App() {
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/auth").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  if (!currentUser) return <Login setCurrentUser={setCurrentUser} />;

  



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
            <NewReservationForm onCreateReservation = {handleAddReservation} courts = {courts}/>
          </Route>
        </Switch>
      </div>
    
  );
}

export default App;

