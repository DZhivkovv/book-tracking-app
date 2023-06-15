import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLinks({ paths }) {
  /* Generates navigation links using the prop "paths" passed to Navbar component. Each page can pass different prop "paths" to Navbar component so the navigation will show different links in each page */
  return (
    <>
      {paths.map((path) => (
        <li 
          key={path} 
          className={path.startsWith("Welcome,") ? "nav-element user-profile" : `nav-element ${path.toLowerCase().replace(/\s/g, "")}`}
        >
          {/* Creates a link based on the value of each "path" in the array of paths. 
          If a path has a value of 'Home', the link will redirect to the homepage. 
          Also, if the path starts with "Welcome," as in "Welcome, user", the link will redirect to the profile page. */}
            <Link to=
            {
              path === 'Home' ? '/' : 
              path.startsWith("Welcome,") ? "profile":
              `/${path.toLowerCase().replace(/\s/g, "")}`
            }>
            {path}
          </Link>
        </li>
      ))}
    </>
  );
}
