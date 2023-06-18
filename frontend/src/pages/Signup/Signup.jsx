import React, { useState, useEffect } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import Footer from '../../components/Footer/Footer'
import Loader from "../../components/Loader/Loader";

import './signUp.scss'

export default function Signup() {
  const navigate = useNavigate();
  //Checks if the user is logged in already
  const {isLoggedIn} = useAuthentication();

  // Redirect if the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);


  // Stores the form input values
  const [userCredentials, setUserCredentials] = useState({ 
    email: "", 
    username: "", 
    password: "", 
    confirmPassword: "" 
  });
  const { email, username, password, confirmPassword } = userCredentials;
  const [isLoading, setIsLoading] = useState(false);

  // Update the userCredentials state everytime the value in an input field changes.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials((prevUserCredentials) => ({ ...prevUserCredentials, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // If the password and confirm password match, sends a POST request to the server in order to save the user in the database
    if(password === confirmPassword){
      setUserCredentials((prevUserCredentials) => ({
        ...prevUserCredentials,
        error: null
      }));

      await fetch('https://bookshelf-backend-ip1h.onrender.com/auth/signup',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          username,
          password
        })    
      })
      .then(response => response.json())
      .then(data =>       {
        if(data.status === 200){
        // Check if the signup is successful and redirects the user to login page if it is.
          setIsLoading(false)
          navigate('/login');
        } else{
          setIsLoading(false)
          // If there is an error, set the error message in the userCredentials state
          setUserCredentials((prevUserCredentials) => ({
            ...prevUserCredentials,
            error: data.message
          }));
        }
      });

    } else {
      setIsLoading(false)
      // If the passwords do not match, displays an error message to the user
      setUserCredentials((prevUserCredentials) => ({
        ...prevUserCredentials,
        confirmPassword: '', //Empties the confirm password field so the user can type on it again.
        error: 'Passwords do not match'
      }));
    } 
  }

  // Each object in this array represents a form input field with its properties. It will be used by the Form component to generate input fields for the specific needs of this page.
  const formTemplate = [
    {
      label: "Email",
      type: "email",
      placeholder: "Email address",
      name: "email",
      value: email,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Username",
      type: "text",
      placeholder: "Username",
      name: "username",
      value: username,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Password",
      name: "password",
      value: password,
      onChange: handleChange,
      minLength: "8",
      required: true,
    },
    {
      label: "Confirm password",
      type: "password",
      placeholder: "Confirm password",
      name: "confirmPassword",
      value: confirmPassword,
      onChange: handleChange,
      required: true,
    },
  ];

  return (
    <div className="signup-container">
      <Navbar paths={['Home', 'Attributions']} />
      <main>
        <h1>Create an account</h1>
        
        {/*Displays an error if there is one.*/}
        {userCredentials.error && <p className="error-message">{userCredentials.error}</p>}
        {/* Displays loader while the user information is being saved in the database */}
        <Loader isLoading={isLoading} />
        
        {/*Signup form*/}
        <Form 
            template={formTemplate}
            onSubmit = {handleSubmit}                
        >
          <p>Sign up</p>
        </Form>
        <p className="login-message">Already have an account? <Link to='/login'>Log in.</Link></p>
        <p className="password-requirement">
            The password must contain at least one uppercase letter, one lowercase letter, one digit, one special character from the set @$!%*?& and be at least 8 characters long.
        </p>
      </main>
      <Footer/>
    </div>
  );
}
  