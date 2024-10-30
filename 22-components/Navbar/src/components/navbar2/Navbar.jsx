import React from 'react'
import NavList from './NavList'

const Navbar = () => {
    const lists = [
        { link: "/about", label: "About" },
        { link: "/login", label: "Login" },
        { link: "/logout", label: "Logout" },
        { link: "/signin", label: "SignIn" },
    ]
    return (
        <div>
            <div>
                <NavList lists={lists} />
            </div>
        </div>
    )
}

export default Navbar