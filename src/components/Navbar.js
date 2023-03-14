import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

export default function Navbar(){
    return(
    <nav>
        <ul className='nav-bar'>
            <input type='checkbox' id='check' />
            <span className="menu">
                <Link to='/addBook'>Add a book</Link>
                <Link to='/library'>Library</Link>
                <Link to='/aboutMe'>About Me</Link>
                <Link to='/attributions'>Attributions</Link>
                <label for="check" className="close-menu"><i className="fas fa-times"></i></label>
            </span>
            <label for="check" className="open-menu"><i className="fas fa-bars"></i></label>
        </ul>
    </nav>
    )
}