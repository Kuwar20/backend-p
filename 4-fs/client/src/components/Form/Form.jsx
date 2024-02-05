import React from 'react'
import './Form.css'

const Form = () => {
  return (
    <div className='form'>
      <form>
        <label>Name:
          <input type="text"
            placeholder='Name'
            />
        </label>
        <br />
        <label>Email:
          <input type="email"
            placeholder='Email'
            />
        </label>
        <br />
          <button>Submit</button>
      </form>
    </div>
  )
}

export default Form