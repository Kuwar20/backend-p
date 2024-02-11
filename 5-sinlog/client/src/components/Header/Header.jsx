import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const isLogin = localStorage.getItem('Login');

  const handleLogout = () => {
    localStorage.removeItem('Login');
    window.location.reload();
  }

  return (
    <div className='header'>
      <nav>
        <ul className='option'>
          <li className='right'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='left'>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li className='left'>
            <NavLink to='/signup'>Signup</NavLink>
          </li>
          <li className='right'>
            {isLogin &&
              <button onClick={handleLogout}>Logout</button>
            }
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header