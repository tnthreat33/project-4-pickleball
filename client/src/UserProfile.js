import React from "react";

function UserProfile({ user }) {

  return (
    <>
      <h1>Profile Page</h1>
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>

      <h2>Your Reservations:</h2>
        {user.reservations.length > 0 ? (
          <ul>
            {user.reservations.map(reservation => (
              <li key={reservation.id}>
                <p>Date: {reservation.date}</p>
                <p>Start Time: {reservation.start_time}</p>
                <p>End Time: {reservation.end_time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reservations found.</p>
        )}
    </>
  );
}

export default UserProfile;
