import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLinks({ paths }) {
  /* Generates navigation links using the prop "paths" passed to Navbar component. Each page can pass different prop "paths" to Navbar component so the navigation will show different links in each page */
  return (
    <>
      {paths.map((path) => (
        <li key={path}>
          {/* Creates a link based on the value of each "path" in the array of paths. If a path has a value of 'Home', the link will redirect to the homepage */}
            <Link to={path === 'Home' ? '/' : `/${path.toLowerCase()}`}>
            {path}
          </Link>
        </li>
      ))}
    </>
  );
}
