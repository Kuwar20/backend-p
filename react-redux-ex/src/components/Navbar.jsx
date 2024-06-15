import React from 'react'

const Navbar = ({ count }) => {
    return (
        <div>We are passing data from parent components 'app.jsx' to child component 'navbar.jsx'.
            the number of count is: {count}</div>
    )
}

export default Navbar