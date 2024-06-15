import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {
    const count = useSelector((state) => state.counter.value)

    return (
        <div>We are passing data from parent components 'app.jsx' to child component 'navbar.jsx'.
            the number of count is: {count}</div>
    )
}

export default Navbar