import React from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='signup'>
      <h2>Signup</h2>
      <form>
        <label>Name:
          <input 
              type="text"
              placeholder='Enter your name'
            />
        </label>
        <br />
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
        <button>Signup</button>
        <Link to='/login'><p>Already have account?</p></Link>
      </form>
    </div>
  )
}

export default Signup