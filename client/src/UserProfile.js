import React from "react";

function UserProfile({ user }) {
  console.log(user)

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
                <p>Start Time: {new Date(reservation.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
    End Time: {new Date(reservation.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
