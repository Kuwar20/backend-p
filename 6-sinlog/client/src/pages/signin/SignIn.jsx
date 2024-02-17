import React from 'react'
import './SignIn.css'

const SignIn = () => {
  return (
    <div className='register'>
      <h1>Sign In</h1>
      <form>
        <label>Full Name:
          <input 
            type="text"
            placeholder='Enter your Name'
            />
        </label>
        <br />
        <label>
          Email:
          <input 
            type="email"
            placeholder='Enter your Email'
          />
        </label>
        <br />
        <label>Gender: 
        <select className='options'>
          <option value='' disabled>Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
        </label>
        <br />
        <label>Password:
          <input 
            type="password"
            placeholder='Enter your Password'
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SignIn