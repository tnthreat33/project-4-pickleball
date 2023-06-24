import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar({ onLogout, user }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <div className="navbar">
      <header>
        Welcome, {user.name} <button onClick={handleLogout}>Logout</button> </header>
        
      
      <nav>
      <h4>Find Your Pickleball Court </h4>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/courts">Courts</NavLink>
          </li>
          <li>
            <NavLink to="/reservations">Reservations</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;