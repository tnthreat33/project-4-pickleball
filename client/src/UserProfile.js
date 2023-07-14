import React, {useContext} from 'react';
import { UserContext} from "./Context/user";
import "./UserProfile.css";
import { Link } from 'react-router-dom';

function UserProfile() {
  const { currentUser} = useContext(UserContext);

  return (
    <div className="profile-container">
      <h1> {currentUser.name} Profile Page</h1>
      <h3>{currentUser.email}</h3>

      <h2>Your Reservations:</h2>
      <Link to={'/reservations'}>
                        <button>Edit Reservations</button>
                      </Link>
      {currentUser.reservations.length > 0 ? (
        <div className="reservation-container">
          {currentUser.reservations.map((reservation) => (
            <div className="reservation-card" key={reservation.id}>
              <p>Date: {reservation.date}</p>
              <p>Court: {reservation.court_name}</p>
              <p> Time: {reservation.formatted_time}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
}

export default UserProfile;
