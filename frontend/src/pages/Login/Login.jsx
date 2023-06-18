import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {useAuthentication} from '../../hooks/useAuthentication';
import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import Footer from "../../components/Footer/Footer";

import '../../assets/styles/login.scss'

export default function Login() {
  const navigate = useNavigate();
  //Checks if the user is logged in already
  const {isLoggedIn} = useAuthentication();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Stores the login form input values
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userCredentials;

  const [errorMessage, setErrorMessage] = useState(null); //State variable that stores any error message that may occur during the login process

  // Updates the userCredentials state everytime the value in an input field changes. 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials((prevUserCredentials) => ({ ...prevUserCredentials, [name]: value }));
    setErrorMessage(null); //Clears the error message when the user starts editing the input fields again.
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send login request to the server with the user credentials
    await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          // Stores the token and redirects to home page on successful login
          localStorage.setItem('token', data.token); // Stores the token in the local storage
          navigate('/');
        } else if (data.status === 400) {
          // Displays an error message on failed login attempt
          setErrorMessage(data.message);
        }
      });
  };

  // Each object in this array represents a form input field with its properties.
  // It will be used by the Form component to generate input fields for the specific needs of this page.
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
      label: "Password",
      type: "password",
      placeholder: "Password",
      name: "password",
      value: password,
      onChange: handleChange,
      minLength: "8",
      required: true,
    },
  ];

  return (
    <div className="login-container">
      <Navbar paths={['Home', 'Attributions']} />
      {/* Signup form */}
      <main>
        <h1>Log in</h1>
      {/*Displays an error message if it exists */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Form
          template={formTemplate}
          onSubmit={handleSubmit}
        >
          <p>Log in</p>
        </Form>
        <p className="signup-message">Don't have an account? <Link to='/signup'>Create an account.</Link></p>
      </main>
      <Footer />
    </div>
  );
}
