import React, { useEffect, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
/* (2/3)
after making main page protected route and can be only accessed after login, we will make login page
then after we click the login button it will set the Login key in local storage and redirect to main page
*/
const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Reset response message
    setResponseMessage('');

    if (!email) {
      setResponseMessage('Please enter a email to Login')
      return
    }
    if (!password) {
      setResponseMessage('Please enter a password to Login')
      return
    }
    try {
      const response = await fetch(`http://localhost:3000/api/user/login`, {
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
        navigate('/')
      } else {
        // Handle failed login
        setResponseMessage(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setResponseMessage('Login failed. Please try again.');
    }
  }
  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>Password:
          <input
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Login</button>
        {responseMessage && <p>{responseMessage}</p>}
        <Link to='/signup'><p>Create Account?</p></Link>
      </form>
    </div>
  )
}

export default Login