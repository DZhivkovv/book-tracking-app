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
          {path === "Logout" ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link
              to={path === 'Home' ? '/' : `/${path.toLowerCase().replace(/\s/g, "")}`}
            >
              {path}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}
