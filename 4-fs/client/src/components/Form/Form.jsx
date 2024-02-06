import React, { useState } from 'react'
import './Form.css'


const Form = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter name");
      return;
    }
    if (!email) {
      setError("Please enter email");
      return;
    }
    if (!number) {
      setError("Please enter number");
      return;
    }
    if(number.length !== 10){
      setError("Number must be 10 digits")
      return
    }
    setError("");
    console.log(name, email, number);
    setSuccessMessage("Form Submitted successfully")

    setTimeout(()=>{
      setName('');
      setEmail('');
      setNumber('');
      setSuccessMessage('');
      setError('');
    },4500);
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input
            type="text"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>Email:
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label> Number:
          <input
            type="number"
            placeholder='Phone Number'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>
        <br />
        {error && <p style={{ color: "red", fontWeight:"bold", textAlign:"center" }}>{error}</p>}
        <button>Submit</button>
        {successMessage && <p style={{ color: "green", fontWeight:"bold", textAlign:"center" }}>{successMessage}</p>}
      </form>
    </div>
  )
}

export default Form