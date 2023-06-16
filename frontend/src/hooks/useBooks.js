import { useState, useEffect } from "react";
import { useAuthentication } from "./useAuthentication";

//This hook  handles the fetching of a user's books from the server
export function useBooks() {
  const [books, setBooks] = useState(undefined); //Stores the user's books
  const [booksLoaded, setBooksLoaded] = useState(false); // Tracks the loading state of the user's books. The state represents whether the fetch request to retrieve the books has been completed or not.
  const [error, setError] = useState(null); //Stores error messages 
  const { userData, isLoggedIn, isLoading} = useAuthentication(); //Checks if the user is logged in

  //Retrieves the user's books from the server using their ID. 
  const fetchBooks = () => {
    fetch(`http://localhost:4000/books/getUserBooks/${userData.userID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data.userBooks);
        setBooksLoaded(true);// The fetch request to retrieve the books has been completed.
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    //The function retrieving books from the server will execute if the user authentication process is over and the user is logged in the app.
    if (isLoading === false && isLoggedIn === true) {
      fetchBooks();
    }
  }, [userData, isLoggedIn, isLoading]);

  return { books, booksLoaded, error, fetchBooks };
}