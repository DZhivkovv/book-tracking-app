import React from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import homepageImage from '../../assets/images/homepage-image.png'
import '../../assets/styles/Home.scss'

export default function Home(){
    return(
        <div className='homepage-container'>
            <Navbar
                paths={['Library','Attributions']} //Each element in this prop represents a link in the navbar for this particular page. 
            />        
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