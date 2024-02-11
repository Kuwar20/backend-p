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
  const handleUserDelete = () => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    if(!token) {
      alert('token missing')
      return
    }
    
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) {
        return; // Do nothing if user cancels
    }

    fetch('http://localhost:3000/api/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          alert(data.message)
          localStorage.removeItem('Login')
          localStorage.removeItem('email');
          window.location.reload()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const name = localStorage.getItem('email')
  // take gmail and delete everything after @
  const username = name.substring(0, name.indexOf('@'))
  return (
    <div className='main'>
      <div className='content'>
        <h3>So long partner, you took time but is finally here</h3>
        {/* we added span here because  we want to style only username, and ".main .username" this does the job or else if we use 
        ".main p" it gives styling to eveything */}
        <p>Welcome <span className='username'>{username}</span></p>
        <div>
        </div>
        <button className='button' onClick={logoutpr}>Logout</button>
        <button className='del-button' onClick={handleUserDelete}>Delete id</button>
      </div>
    </div>
  )
}

export default Main