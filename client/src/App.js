import React, { useState, useEffect } from 'react';
import { Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import './App.css';
import Home from './Home';
import Courts from './Courts';
import Reservations from './Reservations';
import NewReservationForm from './NewReservationForm';
import Login from './Login';
import NewCourtForm from './NewCourtForm';
import UserProfile from './UserProfile';

function App() {
  const [courts, setCourts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
 

  useEffect(() => {
    // auto-login
    fetch("/auth")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setCurrentUser(user));
        }
      })
      .catch((error) => {
        console.log("Auto-login error:", error);
      });

    fetch("/courts")
      .then((response) => response.json())
      .then((data) => setCourts(data))
      .catch((error) => {
        console.log("Court data fetch error:", error);
      });
  }, []);

  function handleAddCourt(newCourt) {
    setCourts((courts) => [...courts, newCourt]);
  }

  function handleAddReservation(newReservation) {
    setCourts((courts) => ({
      ...courts,
      reservations: [...courts.reservations, newReservation],
    }));
  }

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    })
      .then(() => {
        setCurrentUser(null); // Remove the user from state
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  }

  if (!currentUser) {
    return <Login setCurrentUser={setCurrentUser} />;
  }

  return (
    <div className="App">
      <NavBar onLogout={handleLogout} user = {currentUser}/>
      <Switch>
        <Route exact path="/">
          <Home courts={courts} />
        </Route>
        <Route exact path="/courts">
          <Courts courts={courts} addCourt={handleAddCourt} setCourts={setCourts} />
        </Route>
        <Route exact path="/new-court">
          <NewCourtForm addCourt={handleAddCourt} />
        </Route>
        <Route exact path="/reservations">
          <Reservations courts={courts} setCourts= {setCourts} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
        </Route>
        <Route exact path="/new-reservation">
          <NewReservationForm
            onCreateReservation={handleAddReservation}
            courts={courts}
          />
        </Route>
        <Route exact path="/profile">
          <UserProfile user={currentUser} courts={courts}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
