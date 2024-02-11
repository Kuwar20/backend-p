import React, { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Reset response message
    setResponseMessage('');

    if (!name) {
      //return alert('Please enter name to Signup')
      setResponseMessage('Please enter name to Signup')
      return
    }
    if (!email) {
      //return alert('Please enter a email to Signup')
      setResponseMessage('Please enter a email to Signup')
      return
    }
    if (!password) {
      //return alert('Please enter a password to Signup')
      setResponseMessage('Please enter a password to Signup')
      return
    }
    if (password.length < 6) {
      //return alert('Password must be at least 6 characters')
      setResponseMessage('Password must be at least 6 characters')
      return
    }
    try {
      const response = await fetch(`http://localhost:3000/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
      //console.log(name, email, password);
      const data = await response.json()
      if (response.ok) {
        // Handle successful signup
        setResponseMessage('Signup successful!');
        // Optionally, redirect the user to a new page or do something else
      } else {
        // Check for specific error message indicating email already exists because that means the user tried to sign up again
        const errorMessage = data.error || 'Signup failed. Please try again.';
        if (response.status === 400 && errorMessage.includes('User with this email already exists')) { //this is the error code and message we set in register for when the email already exists
          setResponseMessage('An account with this email already exists. Please Login instead.');
        } else {
          // Handle other types of errors
          setResponseMessage(errorMessage);
        }
      }
    } catch (error) {
      // Handle fetch errors
      console.error('Error during signup:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
  }

  return (
    <div className='signup'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input
            type="text"
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>Email:
          <input
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>Password:
          <input
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Signup</button>
        <Link to='/login'><p>Already have account?</p></Link>
        <div className='response-op'>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </form>
    </div>
  )
}

export default Signup