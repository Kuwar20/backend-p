import React from 'react'
import logo from '../assets/brand_logo.png';
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className='container'>
            <div className='logo'>
                <img src={logo} alt="Logo" />
            </div>
            <ul>
                <li href='#'>Menu</li>
                <li href='#'>Location</li>
                <li href='#'>About</li>
                <li href='#'>Contact</li>
            </ul>

            <button>Login</button>
        </nav>
    )
}

export default Navbar