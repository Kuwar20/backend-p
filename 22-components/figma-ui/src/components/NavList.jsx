import React from 'react'
import Navbar from './Navbar'

const NavList = () => {

    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'Find a doctor', link: '/doctor' },
        { name: 'App', link: '/app' },
        { name: 'Testimonials', link: '/testimonials' },
    ]

    return (
        <div>
            <Navbar navItems={navItems} />
        </div>
    )
}

export default NavList