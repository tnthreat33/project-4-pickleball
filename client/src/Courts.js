import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Courts.css';

function Courts({ courts }) {
  const [selectedCourt, setSelectedCourt] = useState(null);

 

  const handleReservationClick = (court) => {
    setSelectedCourt(court);
  };

  return (
    <div className="courts-container">
      <h1>Find Your Courts</h1>
      <div className="button-container">
        <h3>Add A Court For Others To Use</h3>
        <Link to="/new-court" className="create-court-button">
          <button>Create New Court</button>
        </Link>
      </div>
      <div className="table-container">
        <table className="court-table">
          <thead>
            <tr>
              <th>Court</th>
              <th>Location</th>
              <th>Price</th>
              <th>See Reservations</th>
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
                  {selectedCourt === court && (
                    <div>
                      <h4>Reservations for {court.name}</h4>
                      {court.reservations.length > 0 ? (
                        <ul>
                          {court.reservations.map((reservation) => (
                            <li key={reservation.id}>
                              | Date: {reservation.date} | Start Time: {new Date(reservation.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                              End Time: {new Date(reservation.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No reservations found for {court.name}.</p>
                      )}
                    </div>
                  )}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courts;
