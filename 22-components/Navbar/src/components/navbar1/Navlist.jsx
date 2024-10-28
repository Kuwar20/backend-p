import React from 'react'
import Navbar1 from './Navbar1'

const Navlist = () => {

    const links = [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/about' },
        { label: 'Services', link: '/services' },
        { label: 'Contact', link: '/contact' },
    ]

    return (
        <div>
            <Navbar1 links={links} />
        </div>
    )
}

export default Navlist