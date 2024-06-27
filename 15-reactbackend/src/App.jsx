import './App.css'
import { useState } from 'react'

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!name && !email && !createdAt){
      alert('Please fill any of the field to search')
      return
    }
    console.log('Form Submitted')
    try {
      const response = await fetch(`https://666fc0fe0900b5f872481dcc.mockapi.io/pagination`)
      const fetchedData = await response.json();
      console.log(fetchedData)
      setData(fetchedData)
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error("Error: ", error.message)
    }
  }

  const handleReset = () => {
    setData([])
    setName('')
    setEmail('')
    setCreatedAt('')
    setPassword('')
  }

  // search user using name, email, createdAt or any combination of these or single field
  const handleSearch = async()=>{
    // check if any of the field is filled
    if(!name && !email && !createdAt){
      alert('Please fill any of the field to search')
      return
    }
    try {
      // add query params to the url and fetch the data
      const response = await fetch(`https://666fc0fe0900b5f872481dcc.mockapi.io/pagination?name=${name}&email=${email}&createdAt=${createdAt}`)
      const fetchedData = await response.json();
      console.log(fetchedData)
      setData(fetchedData)
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error("Error: ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
          </label>
          <input type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
            //value={data.map((item) => item.name).join(', ')}
          />
        </div>
        <br />
        <div>
          <label>
            Email:
          </label>
          <input type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            //value={data.map((item) => item.email).join(', ')}
          />
        </div>
        <br />
        <div>
          <label>
            Password:
          </label>
          <input type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            //value={data.map((item) => item.password).join(', ')}
          />
        </div>
        <br />
        <div>
          <label>
            Created At:
          </label>
          <input type="text"
            value={createdAt}
            onChange={(e)=>setCreatedAt(e.target.value)}
            //value={data.map((item) => item.createdAt).join(', ')}
          />
        </div>
        <br />
        <div>
          <button type="submit">Show Users</button>
          <button type="button" onClick={handleReset}>Reset</button>
          <button type='button' onClick={handleSearch}>Search user</button>
        </div>
      </form>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <h2>Name: {item.name}</h2>
            <p>Email: {item.email}</p>
            <p>Password: {item.password}</p>
            <p>CreatedAt: {item.createdAt}</p>
          </div>
        ))
      ) : (<p>No data</p>)
      }
    </>
  )
}

export default App
