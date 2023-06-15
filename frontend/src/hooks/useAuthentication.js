import { useState, useEffect } from "react";

export function useAuthentication() {
  // State variables to store user data and authentication status
  const [userData, setUserData] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
          setIsLoggedIn(data.isLoggedIn);
          setUserData({
            "userID":data.userID,
            "username":data.username
          }); // Update user data variable with received userID and username
        }      
        setIsLoading(false);
      })
  }, []);

  // Returns user data and authentication status
  return { userData, isLoggedIn, isLoading };
}
