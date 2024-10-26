import React from 'react'
import Navbar from './Navbar';

const Navbarlist = () => {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Contact', url: '/contact' },
    ];
    
    return (
        <div>
            <Navbar links={links} />
        </div>
    )
}

export default Navbarlist