import React from 'react';
import './Reservations.css';
import { Link } from 'react-router-dom';

function Reservations({ courts, setCourts, setCurrentUser, currentUser }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  function handleDelete(reservationId) {
    // ... delete reservation logic ...
  }

  return (
    <div className="reservations-container">
      <h1>Reservations</h1>
      <div className="button-container">
        <h4>Create Your Reservation</h4>
        <Link to="/new-reservation" className="create-reservation-button">
          <button>Add Reservation</button>
        </Link>
      </div>
      <div>
        <h2>Your Reservations</h2>
        {currentUser.reservations.length > 0 ? (
          <table>
            <tbody>
              {currentUser.reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.court}</td>
                  <td>{formatDate(reservation.date)}</td>
                  <td>
                    {new Date(reservation.start_time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    -{' '}
                    {new Date(reservation.end_time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
      <div className="courts-container">
        <h2>All Reservations</h2>
        {courts.map((court) => (
          <div key={court.id}>
            <h3>{court.name}</h3>
            {court.reservations.length > 0 ? (
              <table>
                <tbody>
                  {court.reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{formatDate(reservation.date)}</td>
                      <td>
                        {new Date(reservation.start_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        -{' '}
                        {new Date(reservation.end_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td>
                        <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No reservations found for {court.name}.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservations;
