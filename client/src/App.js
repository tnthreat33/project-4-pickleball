
import React, { useState, useEffect, useContext } from 'react';
import { UserContext} from "./Context/user";
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
  const [error, setError] =useState('')
  const { currentUser, setCurrentUser } = useContext(UserContext);
  

 
  useEffect(() => {
    // auto-login
    fetch("/auth")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((data) => {
            setError(data.errors.login); // Access the specific error message
          });
        }
      })
      .then((user) => {
        setCurrentUser(user);
        return user;
      })
      .catch((error) => {
        console.log("Authentication error:", error);
      });
  
    // Fetch courts
    fetch("/courts")
      .then((response) => response.json())
      .then((data) => setCourts(data))
      .catch((error) => {
        console.log("Court data fetch error:", error);
      });
  }, [setCurrentUser]);
  

 if (!currentUser) return <Login  />;
   

  

 function handleAddCourt(newCourt) {
  if (newCourt && newCourt.id) {
    setCourts((courts) => [...courts, newCourt]);
  } else {
    console.error("Failed to add new court:", newCourt);
  }
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
  
  function handleUpdateReservation(updatedReservation) {
    const updatedCourts = courts.map((court) => {
      if (court.id === updatedReservation.court_id) {
        const updatedReservations = court.reservations.map((reservation) => {
          if (reservation.id === updatedReservation.id) {
            return updatedReservation;
          }
          return reservation;
        });
  
        return {
          ...court,
          reservations: updatedReservations,
        };
      }
      return court;
    });
  
    setCourts(updatedCourts);
  
  const updatedUserReservations = currentUser.reservations.map((reservation) => {
    if (reservation.id === updatedReservation.id) {
      return updatedReservation;
    }
    return reservation;
  });
  
  setCurrentUser((prevUser) => ({
    ...prevUser,
    reservations: updatedUserReservations,
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



  return (
    <div className="App">
        {error && (
              <div className="error-container">
                <p>{error}</p>
               
              </div>
            )}
      
      <NavBar onLogout={handleLogout}  />
      <Routes>
        <Route path="/" element={<Home courts={courts} />} />
        <Route
          path="/courts"
          element={
            <Courts
              courts={courts} 
              addCourt={handleAddCourt}
              setCourts={setCourts}
            />
          }
        />
        <Route
          path="/new-court"
          element={<NewCourtForm addCourt={handleAddCourt} />}
        />
        <Route
          path="/reservations"
          element={
            <Reservations
              courts={courts}
              setCourts={setCourts}
              
            />
          }
        />
        <Route
          path="/new-reservation"
          element={
            <NewReservationForm
              onCreateReservation={handleAddReservation}
              courts={courts}
            />
          }
        />
        <Route
          path="/update-reservation/:reservationId"
          element={
            <UpdateReservationForm
              courts={courts}
              handleUpdateReservation={handleUpdateReservation}
            />
          }
        />
        <Route
          path="/profile"
          element={<UserProfile />}
        />
      </Routes>
      
    </div>
  );
}

export default App;




