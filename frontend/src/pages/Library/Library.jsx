import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from '../../hooks/useAuthentication.js'
import { useBooks } from "../../hooks/useBooks.js";
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'

import '../../assets/styles/Library.scss'

export default function Library() {
    const { userData, isLoggedIn } = useAuthentication();// Tracks if the user is logged in and contains data about them.
    const { books, booksLoaded, fetchBooks } = useBooks();// Contains all books added by the user
    const [isBookDeleted, setIsBookDeleted] = useState(false);// Tracks if a book has been deleted.

    // Sends a request to remove the book with the specified ID
    const onDeleteBook = async (bookID) => {
        await fetch('http://localhost:4000/books/removeBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookID })
        })

        setIsBookDeleted(true);
    };

export default function Library() {    
    const { userData, isLoggedIn} = useAuthentication();
    const {books,booksLoaded} = useBooks();
    const booksArray = booksLoaded ? books.map(book => <p>{book.title}</p>) : [];

    useEffect(() => {
    //If a book has been deleted, the fetchBooks function will execute and retrieve all books from the user. This will update the page and display all the books, except the deleted one.
    if (isBookDeleted) {
        fetchBooks();
        setIsBookDeleted(false);
      }
    }, [isBookDeleted, fetchBooks]);    
    
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