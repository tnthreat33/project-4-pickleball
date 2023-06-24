import React, { useState} from 'react';
import { Link } from 'react-router-dom';

function Courts({courts, setCourts}) {
  
  const [selectedCourt, setSelectedCourt] = useState(null);

  
  function handleDelete(courtId) {
    fetch(`/courts/${courtId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setCourts((prevCourts) => prevCourts.filter((court) => court.id !== courtId));
        } else {
          throw new Error('Failed to delete court');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  const handleReservationClick = (court) => {
    setSelectedCourt(court);
  };


  return (
    <>
      <h1>Courts</h1>
      <div className="button-container">
        <Link to="/new-court" className="create-court-button">
          <button> Create New Court</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Court</th>
            <th>Location</th>
            <th>Price</th>
            <th>See Reservations</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr key={court.id}>
              <td>{court.name}</td>
              <td>{court.address}</td>
              <td>{court.price}</td>
              <td>
                <button onClick={() => handleReservationClick(court)}>View Reservations</button>
              </td>
              <td>
                <button onClick={() => handleDelete(court.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCourt && (
      <div>
        <h2>Reservations for {selectedCourt.name}</h2>
        {selectedCourt.reservations.length > 0 ? (
          <ul>
            {selectedCourt.reservations.map((reservation) => (
              <li key={reservation.id}>
                | Date: {reservation.date} |
                Start Time: {new Date(reservation.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
    End Time: {new Date(reservation.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reservations found for {selectedCourt.name}.</p>
        )}
      </div>
      )}
    </>
  );
}

export default Courts;
