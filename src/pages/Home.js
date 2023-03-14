import React from 'react'
import './Home.css'
import Navbar from '../components/Navbar'
import headingImage from '../img/—Pngtree—hand drawn girl reading book_4050570.png'


export default function Home(){
    return(
        <div className="home--container">
          <Navbar/>
          <div className='home--text-container'>
            <h1>Book Track</h1>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <div className='home--image-container'> 
            <img src={headingImage} alt='Homepage image.'   className='headingImage'></img>
          </div>      
        </div>
    )

}
