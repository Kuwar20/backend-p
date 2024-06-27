import './App.css'
import { useState } from 'react'

function App() {
  const [data, setData] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
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
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
          </label>
          <input type="text"
            value={data.map((item) => item.name).join(', ')}
          />
        </div>
        <br />
        <div>
          <label>
            Email:
          </label>
          <input type="email"
            value={data.map((item) => item.email).join(', ')}
          />
        </div>
        <br />
        <div>
          <label>
            Password:
          </label>
          <input type="password"
            value={data.map((item) => item.password).join(', ')}
          />
        </div>
        <br />
        <div>
          <button type="submit">Show Users</button>
          <button type="button" onClick={handleReset}>Reset</button>
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
