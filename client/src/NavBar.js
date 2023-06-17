import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar(){
    return(
        <div className="navbar">
        <header>Find Your Pickleball Court</header>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/courts">Courts</NavLink>
            </li>
          </ul>
        </nav>
        </div>
    )
}

export default NavBar;