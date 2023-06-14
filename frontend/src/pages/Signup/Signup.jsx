import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import Footer from '../../components/Footer/Footer'

export default function Signup() {
  // Stores the form input values
  const [userCredentials, setUserCredentials] = useState({ 
    email: "", 
    username: "", 
    password: "", 
    confirmPassword: "" 
  });
  const { email, username, password, confirmPassword } = userCredentials;

  // Update the userCredentials state everytime the value in an input field changes.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials((prevUserCredentials) => ({ ...prevUserCredentials, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If the password and confirm password match, sends a POST request to the server in order to save the user in the database
    if(password === confirmPassword){
      setUserCredentials((prevUserCredentials) => ({
        ...prevUserCredentials,
        error: null
      }));

      await fetch('http://localhost:4000/signup',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          username,
          password
        })    
      })  
    } else {
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
      <h1>Sign up</h1>      
      {/*Displays an error if there is one.*/}
      {userCredentials.error && <p className="error">{userCredentials.error}</p>}

      <div className="form-container">
      {/*Signup form*/}
        <Form 
          template={formTemplate} formButtonLabel='Sign up'
          onSubmit = {handleSubmit}                
        />
      </div>
      <Footer/>
    </div>
  );
}
  