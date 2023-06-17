import React from 'react';
import './Reservations.css';
import { Link } from 'react-router-dom';

function Reservations({ courts }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
console.log(courts)
  return (
    <>
      <h1>Reservations</h1>
      <div className="button-container">
        <Link to="/new-reservation" className="create-reservation-button">
          <button> Create New Reservation</button>
        </Link>
      </div>
      <table>
        {/* <thead>
          <tr>
            <th>Court</th>
            <th>Date</th>
            <th>Time</th>
            <th>Delete</th>
          </tr>
        </thead> */}
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
                  {/* </td>
                  <td>
                    <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                  </td> */}
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
