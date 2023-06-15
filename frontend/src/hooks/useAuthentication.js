import { useState, useEffect } from "react";

export function useAuthentication() {
  // State variables to store user data and authentication status
  const [userData, setUserData] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Makes a request to the server to check if the user is logged in
    fetch("http://localhost:4000/auth/isUserLoggedIn", {
      headers: {
        "x-access-token": localStorage.getItem("token"), // Includes the token from local storage in the request header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          // If the response status is 200, the user is logged in
          setIsLoggedIn(data.isLoggedIn);
          setUserData(data.username); // Update user data with received username
        }
      });
  }, []);

  // Returns user data and authentication status
  return { userData, isLoggedIn };
}
