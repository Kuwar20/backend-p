import React, { useState } from 'react'
import "./FormSearch2.css"


const FormSearch2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e, searchType) => {
    e.preventDefault();

    if (searchType === 'name') {
      fetchNameAPI(name);
    }

    else if (searchType === 'email') {
      fetchEmailAPI(email);
    }
    else {
      fetchNumberAPI(number)
    }
  }

  const fetchNameAPI = async (name) => {
    console.log(`fetching API for name: ${name}`);
    try {
      const response = await fetch(`http://localhost:3000/api/user/by-name/${name}`)
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchEmailAPI = async (email) => {
    console.log(`fetching API for email: ${email}`);
    try {
      const response = await fetch(`http://localhost:3000/api/user/by-email/${email}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  }
  const fetchNumberAPI = async (number) => {
    console.log(`fetching API for number: ${number}`);
    try {
      const response = await fetch(`http://localhost:3000/api/user/by-number/${number}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error)
    }
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
          Remember Number ?
          <input
            type="text"
            placeholder='Enter Number'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e, 'number')}>Search</button>
        </label>
      </form>
    </div>
  )
}

export default FormSearch2