import React, {useContext} from 'react';
import { UserContext} from "./Context/user";
import './Reservations.css';
import { Link } from 'react-router-dom';

function Reservations({ courts, setCourts}) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

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
          const updatedUser = {
            ...currentUser,
            reservations: currentUser.reservations.filter(
              (reservation) => reservation.id !== reservationId
            ),
          };
          setCurrentUser(updatedUser);
        } else {
          console.log('Error deleting reservation:', reservationId);
        }
      })
      .catch((error) => {
        console.log('Delete reservation error:', error);
      });
  }

  const formatDate = (dateString) => {
    const date = new Date(`${dateString}T00:00:00Z`);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  };


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
                return (
                  <tr key={reservation.id}>
                    <td>
                      <h4>{reservation.court_name} -</h4>
                    </td>
                    <td>{formatDate(reservation.date)}</td>
                    <td>
                      {reservation.formatted_time}
                    </td>
                    <td>
                      <Link to={`/update-reservation/${reservation.id}`}>
                        <button>Update</button>
                      </Link>
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
                        {reservation.formatted_time}
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
