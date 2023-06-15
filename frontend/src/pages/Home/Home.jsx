import React from 'react'
import { useAuthentication } from '../../hooks/useAuthentication.js'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import homepageImage from '../../assets/images/homepage-image.png'
import '../../assets/styles/Home.scss'

export default function Home(){
    const {userData, isLoggedIn} = useAuthentication();

    return(
        <div className='homepage-container'>
            {/* Renders the Navbar component based on the user's authentication status */}
           {isLoggedIn ? 
            <Navbar  paths={['Library','Attributions',`Welcome, ${userData.username}`,'Logout']}/> 
            : 
            <Navbar  paths={['Library','Attributions', 'Log in', 'Sign Up']}/>
           }
                    
            <main>
                <div className="homepage-text-container">
                    <h1 className="home-heading">Bookshelf</h1>
                    <p className="bookshelf-slogan">because every book deserves to be remembered.</p>
                </div>
                <div className="homepage-image-container">
                    <img src={homepageImage} alt="A girl reading a book" className="homepage-main-image"></img>
                </div>
            </main>
            <Footer/>
        </div>
    )
}