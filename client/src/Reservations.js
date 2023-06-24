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
    <>
      <h1>Reservations</h1>
      <div className="button-container">
        <Link to="/new-reservation" className="create-reservation-button">
          <button> Create New Reservation</button>
        </Link>
      </div>
      <table>
        <tbody>
          {courts.map((court) => (
            <React.Fragment key={court.id}>
              <tr>
                <td colSpan="4">{court.name}</td>
              </tr>
              {court.reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td></td>
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
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Reservations;
