import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('')

    if (!email || !password) {
      setResponseMessage('All fields are required')
      return
    } else {
      setResponseMessage('')
    }

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        // Handle successful login
        setResponseMessage('Login successful!');
        // when we login, it gives jwt token we store it in localstorage and use it to delete the user in main page
        localStorage.setItem('email', email);
        // Save token to localStorage upon successful login ( this is jwt token we will use it to delete the user in main page, because to delete a user we need two things email and token which we sent from backend code)
        localStorage.setItem('token', data.token);
        //console.log(data.token)
        // Optionally, redirect the user to a new page or do something else
        localStorage.setItem('Login', true)
      } else {
        // Handle failed login
        setResponseMessage(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input
            type="text"
            placeholder='Enter your name'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>Login</button>
      </form>
      <div className='response'>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  )
}

export default Login