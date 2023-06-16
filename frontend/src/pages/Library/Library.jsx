import React from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from '../../hooks/useAuthentication.js'
import { useBooks } from "../../hooks/useBooks.js";
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'

import '../../assets/styles/Library.scss'

export default function Library() {    
    const { userData, isLoggedIn} = useAuthentication();
    const {books,booksLoaded} = useBooks();
    const booksArray = booksLoaded ? books.map(book => <p>{book.title}</p>) : [];

    return(
        <div className="library-container">
            {/* Renders the Navbar component based on the user's authentication status */}
            {isLoggedIn ? 
            <Navbar  paths={['Library','Attributions',`Welcome, ${userData.username}`,'Logout']}/> 
            : 
            <Navbar  paths={['Library','Attributions', 'Log in', 'Sign Up']}/>
           }
           <div className="library">
                {booksArray.length > 0 ? booksArray : <p>No books yet...</p>}
            </div>
            <Link to='/add-book' className="link-addbook">+</Link>
            <Footer/>
        </div>
    )

}