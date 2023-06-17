import React from "react";
import { Link } from "react-router-dom";

function Home({ courts }) {
    return (
      <div>
        <h1>Welcome Home</h1>
        <h2>Latest Courts:</h2><Link to={'/courts'}>
                    <button>More</button>
                  </Link>
        <table>
        <thead>
          <tr>
            <th>Court</th>
            <th>Location</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {courts.slice(0, 5).map((court) => (
            <tr key={court.id}>
              <td>{court.name}</td>
              <td>{court.address}</td>
              <td>{court.price}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    );
  }

  export default Home; 