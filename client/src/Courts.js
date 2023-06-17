import React from 'react';
import { Link } from 'react-router-dom';

function Courts({ courts }) {
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
          </tr>
        </thead>
        <tbody>
          {courts.map(court => (
            <tr key={court.id}>
              <td>{court.name}</td>
              <td>{court.address}</td>
              <td>{court.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Courts;
