import React, { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
import './App.css';
import Home from './Home';
import Courts from './Courts';
import Reservations from './Reservations';
import NewReservationForm from './NewReservationForm';
import Login from './Login';
import NewCourtForm from './NewCourtForm';
import UserProfile from './UserProfile';
import UpdateReservationForm from './UpdateReservationForm';

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
    const updatedCourts = courts.map((court) => {
      if (court.id === newReservation.court_id) {
        return {
          ...court,
          reservations: [...court.reservations, newReservation],
        };
      }
      return court;
    });
  setCourts(updatedCourts);

  setCurrentUser((prevUser) => {
    return {
      ...prevUser,
      reservations: [...prevUser.reservations, newReservation],
    };
  });
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
      <Routes>
      <Route path="/" element={<Home courts={courts} />}/>
       <Route exact path="/courts"
         element={ <Courts courts={courts} addCourt={handleAddCourt} setCourts={setCourts} />}
        />
        <Route exact path="/new-court"
          element={<NewCourtForm addCourt={handleAddCourt} />}
        />
        <Route exact path="/reservations"
          element={<Reservations courts={courts} setCourts= {setCourts} setCurrentUser={setCurrentUser} currentUser={currentUser}/>}
        />
        <Route exact path="/new-reservation"
          element={<NewReservationForm
            onCreateReservation={handleAddReservation}
            courts={courts}
          />}
        />
        <Route exact path="/update-reservation/:reservationId"
          element={<UpdateReservationForm courts={courts} setCourts={setCourts} currentUser={currentUser} />}
          />
        <Route exact path="/profile"
          element={<UserProfile user={currentUser} courts={courts}/>}
        /> 
      </Routes>
    </div>
  );
}

export default App;

