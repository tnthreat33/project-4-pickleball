import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar({onLogout}){
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }
    return(
        <div className="navbar">
        <header>Find Your Pickleball Court
        <button onClick={handleLogout}>Logout</button>
        </header>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/courts">Courts</NavLink>
            </li>
            <l1>
                <NavLink to="/reservations">Reservations</NavLink>
            </l1>
          </ul>
        </nav>
        </div>
    )
}

export default NavBar;