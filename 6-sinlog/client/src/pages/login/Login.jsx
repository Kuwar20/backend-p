import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='login'>
      <h2>Login</h2>
      <form>
        <label>Email:
          <input 
            type="text"
            placeholder='Enter your name'
            />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password"
            placeholder='Enter your password'
            />
        </label>
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login