import React, { useState } from 'react'
import "./FormSearch2.css"


const FormSearch2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e, searchType) => {
    e.preventDefault();

    if (searchType === 'name') {
      fetchNameAPI(name);
    }

    else if (searchType === 'email') {
      fetchEmailAPI(email);
    }
    else {
      fetchPasswordAPI(password)
    }
  }

  const fetchNameAPI = (name) => {
    console.log(`fetching API for name: ${name}`);
  }
  const fetchEmailAPI = (email) => {
    console.log(`fetching API for email: ${email}`);
  }
  const fetchPasswordAPI = (password) => {
    console.log(`fetching API for password`);
  }

  return (
    <div className='form-search'>
      <form onSubmit={handleSubmit}>
        <label>
          Remember Name ?
          <input
            type="text"
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e, 'name')}>Search</button>
        </label>
        <br />
        <label>
          Remember Email ?
          <input
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e, 'email')}>Search</button>
        </label>
        <br />
        <label>
          Remember Password ?
          <input
            type="password"
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e, 'password')}>Search</button>
        </label>
      </form>
    </div>
  )
}

export default FormSearch2