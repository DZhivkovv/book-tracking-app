import React from 'react';
import NavLinks from './NavLinks';
import { handleLogout } from '../../utils/handleLogout.js'
import '../../assets/styles/navbar.scss';

export default function Navbar(props) {
  return (
    <div className="navbar--container">
      {/*Button for showing and hiding the navigation menu (for devices with <=800px width)*/}
      <input type="checkbox" className="toggle-menu"></input>
      
      {/*Hamburger icon (for devices with <=800 width) */}
      <div className="hamburger"></div>

      {/*Navigation menu */}
      <ul className="menu">    
          {/* Generates navigation links using the props passed to Navbar component. */}
          <NavLinks paths={props.paths} handleLogout = {handleLogout}/>
      </ul>
    </div>
  );
}
