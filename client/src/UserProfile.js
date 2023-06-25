import React from "react";
import "./UserProfile.css";
import { Link } from 'react-router-dom';

function UserProfile({ user, courts }) {
  

  const getCourtName = (courtId) => {
    const court = courts.find((court) => court.id === courtId);
    return court ? court.name : "Unknown Court";
  };

  return (
    <div className="profile-container">
      <h1> {user.name} Profile Page</h1>
      <h3>{user.email}</h3>

      <h2>Your Reservations:</h2>
      <Link to={'/reservations'}>
                        <button>Edit Reservations</button>
                      </Link>
      {user.reservations.length > 0 ? (
        <div className="reservation-container">
          {user.reservations.map((reservation) => (
            <div className="reservation-card" key={reservation.id}>
              <p>Date: {reservation.date}</p>
              <p>Court: {getCourtName(reservation.court_id)}</p>
              <p>
                Start Time:{" "}
                {new Date(reservation.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                - End Time:{" "}
                {new Date(reservation.end_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
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
