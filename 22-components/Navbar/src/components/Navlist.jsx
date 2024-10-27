import React from 'react';
import Navbar from './Navbar';

const Navlist = () => {
    const links = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <div>
            <Navbar links={links} />
        </div>
    );
};

export default Navlist;
