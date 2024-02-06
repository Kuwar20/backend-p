import React from 'react'
import "./FormSearch2.css"

const FormSearch2 = () => {
  return (
    <div className='form-search'>
      <label>
        Remember Name ?
        <input
          type="text"
          placeholder='Enter Name'
        />
      <button>Search</button>
      </label>
      <br />
      <label>
        Remember Email ?
        <input
          type="email"
          placeholder='Enter Email'
          />
          <button>Search</button>
      </label>
      <br />
      <label>
        Remember Password ?
        <input
          type="password"
          placeholder='Enter Password'
        />
        <button>Search</button>
      </label>
    </div>
  )
}

export default FormSearch2