import React, { useEffect, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
/* (2/3)
after making main page protected route and can be only accessed after login, we will make login page
then after we click the login button it will set the Login key in local storage and redirect to main page
*/
const Login = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const loginpr = () => {
    localStorage.setItem('Login', true)
    navigate('/')
  }
  useEffect(() => {
    // here we have naming conflict with 'login', so we are using 'Login instead with capital L', as a key to check if user is logged in or not
    let Login = localStorage.getItem('Login')
    // if user is not logged in, redirect to login page
    if (Login) {
        navigate('/')
    }
    else {
      setIsLoading(false);
    }
},[navigate]);
if (isLoading) {
  return (
      <div>Loading...</div>
  )
}
/* 
now after
*/
  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form>
        <label>Email:
          <input
            type="text"
            placeholder='Enter your email'
          />
        </label>
        <br />
        <label>Password:
          <input
            type="text"
            placeholder='Enter your password'
          />
        </label>
        <br />
        <button onClick={loginpr}>Login</button>
        <Link to='/signup'><p>Create Account?</p></Link>
      </form>
    </div>
  )
}

export default Login