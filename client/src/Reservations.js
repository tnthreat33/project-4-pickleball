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
    fetch(`/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Reservation deleted:', reservationId);
          // Update the courts state
          const updatedCourts = courts.map((court) => {
            const updatedReservations = court.reservations.filter(
              (reservation) => reservation.id !== reservationId
            );
            return {
              ...court,
              reservations: updatedReservations,
            };
          });
          setCourts(updatedCourts);
          // Update the currentUser state
          const updatedUser = {
            ...currentUser,
            reservations: currentUser.reservations.filter(
              (reservation) => reservation.id !== reservationId
            ),
          };
          setCurrentUser(updatedUser);
        } else {
          // Error deleting reservation
          console.log('Error deleting reservation:', reservationId);
          // Implement error handling logic as needed
        }
      })
      .catch((error) => {
        console.log('Delete reservation error:', error);
        // Implement error handling logic as needed
      });
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
              {currentUser.reservations.map((reservation) => {
                const court = courts.find((court) => court.id === reservation.court_id);
                return (
                  <tr key={reservation.id}>
                    <h4>{court ? court.name : 'Unknown Court'} -</h4>
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
                );
              })}
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
