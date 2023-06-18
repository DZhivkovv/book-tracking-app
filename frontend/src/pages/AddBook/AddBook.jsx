import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import { useAuthentication } from '../../hooks/useAuthentication.js';

import '../../assets/styles/addBook.scss'

export default function AddBook() {
  const navigate = useNavigate();
  const { userData, isLoggedIn, isLoading } = useAuthentication();
  const [bookIsLoading, setBookIsLoading] = useState(false);

  // Redirects the user to the login page if he is not logged in  
  useEffect(()=>{ 
    if(isLoading === false && isLoggedIn === false){
      navigate('/login');
    }
  },[userData,isLoggedIn,isLoading,])

  const [errorMessage, setErrorMessage] = useState(null);
  // Stores information about the book
  const [book, setBook] = useState({
    title: "",
    author: "",
    pages: "",
    status: ""
  });

  const { title, author, pages, status } = book;

  // Updates the book information everytime the value in an input field changes. 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setBookIsLoading(true);

    // Send the book data to the server in order to be saved in the database
    fetch('https://bookshelf-backend-ip1h.onrender.com/books/addBook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        author,
        pages,
        status,
        userData,
      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        if(data.status === 200){
          setBookIsLoading(false);
          navigate('/library');
        } else{
          setBookIsLoading(false);
          setErrorMessage(data.error);
        }
      })
  };


  // Form template for the book input fields
  const formTemplate = [
    {
      label: "Title",
      type: "text",
      placeholder: "Book title",
      name: "title",
      value: title,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Author",
      type: "text",
      placeholder: "Author",
      name: "author",
      value: author,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Pages",
      type: "number",
      placeholder: "Number of pages",
      name: "pages",
      value: pages,
      min: 1,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Read",
      type: "radio",
      placeholder: "read",
      name: "status",
      value: "Read",
      onChange: handleChange,
      required: true,
    },
    {
      label: "Reading",
      type: "radio",
      placeholder: "reading",
      name: "status",
      value: "Reading",
      onChange: handleChange,
      required: true,
    },
    {
      label: "Wants to read",
      type: "radio",
      placeholder: "wants_to_read",
      name: "status",
      value: "Wants to read",
      onChange: handleChange,
      required: true,
    },
  ];

  return (
    <div className="add-book-container">
      {/* Render the appropriate navigation based on the user's authentication status */}
      {isLoggedIn ?
        <Navbar paths={['Library', 'Attributions', `Welcome, ${userData.username}`, 'Logout']} />
        :
        <Navbar paths={['Library', 'Attributions', 'Log in', 'Sign Up']} />
      }

      <main>        
        <div className="add-book-left">
        {/*Displays an error message to the user if there is one*/}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {/*Displays loader while the book is being uploaded to the database */}
        <Loader isLoading={isLoading} />
        <h1>Have you read anything lately?</h1>          
          {/* Render the book form */}
          <Form
            template={formTemplate}
            onSubmit={handleSubmit}
          >
            <p>Add a book</p>
          </Form>
        </div>
        <div className="add-book-right"></div>
      </main>
      <Footer />
    </div>
  );
}
