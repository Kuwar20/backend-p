import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
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
        <button>Login</button>
        <Link to='/signup'><p>Create Account?</p></Link>
      </form>
    </div>
  )
}

export default Login