import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

function Home({ courts }) {
  return (
    <div className="home">
      <h1>Pickleball Court Central</h1>
      <p>Whether you are new to pickleball or you've been a fan since day 1, we are here to help you find courts and reserve your spot to play!</p>
      <h2>Latest Courts:</h2>
      <div className="table-container">
        <table className="court-table">
          <thead>
            <tr>
              <th>Court</th>
              <th>Location</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {courts.slice(-5).map((court) => (
              <tr key={court.id}>
                <td>{court.name}</td>
                <td>{court.address}</td>
                <td>{court.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="find-more">
        <h3>Find More Courts:</h3>
        <Link to="/courts">
          <button>All Courts</button>
        </Link>
        <h3> Make Your Reservations</h3>
        <Link to="/new-reservations">
          <button> Make Reservation</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
