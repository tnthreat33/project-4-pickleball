import React from 'react';
import { Link } from 'react-router-dom';

function Courts({ courts, setCourts }) {

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

  return (
    <>
      <h1>Courts</h1>
      <div className="button-container">
        <Link to="/new-court" className="create-court-button">
          Create New Court
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Court</th>
            <th>Location</th>
            <th>Price</th>
            <th>Remove Court</th> 
          </tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr key={court.id}>
              <td>{court.name}</td>
              <td>{court.address}</td>
              <td>{court.price}</td>
              <td>
                <button onClick={() => handleDelete(court.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Courts;
