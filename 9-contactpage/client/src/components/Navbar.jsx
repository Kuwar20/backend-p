import React from 'react'
import photo from '../../public/images/Service 24_7-pana 1.svg'
import logo from '../../public/images/brand_logo.png'

const Navbar = () => {
    return (
        <nav>
            <div className='logo'>
                <img src={logo} alt="Photo" />
            </div>

            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>

        </nav>
    )
}

export default Navbar