import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from '../../hooks/useAuthentication.js'
import { useBooks } from "../../hooks/useBooks.js";
import Navbar from '../../components/Navbar/Navbar.jsx'
import Book from "../../components/Book/Book.jsx";
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

    // Maps over the books array that should contain all books added by a concrete user. For every book in that array, a Book component is generated. That happens only if booksLoaded is true, meaning that the book retrieving process from the database is over.
    const booksArray = booksLoaded ? books.map(book => <Book key={book._id} id={book._id} title={book.title} author ={book.author} pages = {book.pages} status = {book.status} onDelete = {onDeleteBook}/> ): [];
    
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
            <Navbar  paths={['Home','Attributions',`Welcome, ${userData.username}`,'Logout']}/> 
            : 
            <Navbar  paths={['Home','Attributions', 'Log in', 'Sign Up']}/>
           }
            <h1>Your library</h1>
           <div className="library">
                {booksArray.length > 0 ? booksArray : <p>No books yet...</p>}
            </div>
            <Link to='/add-book' className="link-addbook">+</Link>
        </div>
    )

}