import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLinks({ paths, handleLogout }) {
  /* Generates navigation links using the prop "paths" passed to Navbar component. Each page can pass different prop "paths" to Navbar component so the navigation will show different links in each page */
  return (
    <>
      {paths.map((path) => (
        <li 
          key={path} 
          className={path.startsWith("Welcome,") ? "nav-element user-profile" : `nav-element ${path.toLowerCase().replace(/\s/g, "")}`}
        >
          {/* Conditionally render a Link component for each path */}
          {/*If a prop 'logout' is passed, a button will be generated, not a link */}
          {path === "Logout" ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link
              to={
                path === 'Home' ? '/' : // If the path is 'Home', redirect to the homepage ('/')
                path.startsWith('Welcome,') ? "profile" : // If the path starts with 'Welcome,', redirect to the profile page ('profile')
                `/${path.toLowerCase().replace(/\s/g, "")}` // For other paths, convert to lowercase and remove whitespace from the path to create the appropriate URL
              }
            >
              {path}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}
