import React from 'react'
import './Home.css'

const Home = () => {

  const handleDelete = () => {

    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    if(!token || !email) {
      alert('cant delete')
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
      body: JSON.stringify({ email: localStorage.getItem('email') })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          console.log(data.message)
          // Remove all user data from local storage
          localStorage.removeItem('Login')
          localStorage.removeItem('email')
          localStorage.removeItem('token')
          window.location.reload()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('Login')
    window.location.reload()
  }

  return (
    <div className='main'>
      <div className='main-container'>
        <p>So Long Partner</p>
        <p>I waited for you</p>
        <button className='button-delete' onClick={handleDelete}>Delete id</button>
        <button className='button-logout' onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Home