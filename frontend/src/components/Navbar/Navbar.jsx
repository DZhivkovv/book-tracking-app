import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from '../NavLinks/NavLinks';

import '../../assets/styles/Navbar.scss';

export default function Navbar(props) {
  return (
    <div className="navbar--container">
      {/*Button for showing and hiding the navigation menu (for devices with <=800px width)*/}
      <input type="checkbox" className="toggle-menu"></input>
      
      {/*Hamburger icon (for devices with <=800 width) */}
      <div className="hamburger"></div>

      {/*Navigation menu */}
      <ul className="menu">    
        {/*Left section of navigation */}
        <div className="navbar-section navbar-left">
          {/* Generates navigation links using the props passed to Navbar component. */}
          <NavLinks paths={props.paths} />
        </div>

        {/*Right section of navigation */}
        <div className="navbar-section navbar-right">
          <li key="Log in" className='login-link-container'>
            <Link to="/login">Log in</Link>
          </li>
          <li key="Sign up" className='signup-link-container'>
            <Link to="/signup">Sign up</Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
