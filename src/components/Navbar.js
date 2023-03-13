import React from 'react'
import './Navbar.css'

export default function Navbar(){
    return(
    <nav>
        <ul className='nav-bar'>
            <input type='checkbox' id='check' />
            <span className="menu">
                <li><a href="">Add a book</a></li>
                <li><a href="">Library</a></li>
                <li><a href="">About Me</a></li>
                <li><a href="">Attributions</a></li>
                <label for="check" className="close-menu"><i className="fas fa-times"></i></label>
            </span>
            <label for="check" className="open-menu"><i className="fas fa-bars"></i></label>
        </ul>
    </nav>
    )
}