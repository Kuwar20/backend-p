import React from 'react'
import './Main.css'

const Main = () => {
  const logoutpr = () => {
    localStorage.removeItem('Login')
    window.location.reload()
  }

  /* (3/3)
    here we remove Login from local storage and reload the page to redirect to login page when the user click the logout button, because 
    the user no longer wants to be in protected route 
  */

  return (
    <div className='main'>
      <div className='content'>
      <h3>So long partner, you took time but is finally here</h3>
      <p>Welcome</p>
      <button className='button' onClick={logoutpr}>Logout</button>
      </div>
    </div>
  )
}

export default Main