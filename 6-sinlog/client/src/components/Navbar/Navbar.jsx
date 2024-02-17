import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <NavLink to='/'>Home</NavLink>
      </div>
      <div className='navbar-right'>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
      </div>
    </div>
  )
}

export default Navbar