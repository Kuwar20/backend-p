import React, { useState } from 'react'
import toast,{Toaster} from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [issubmitted, setIssubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIssubmitted(true)
    try {
      const response = await fetch('http://localhost:3000/api/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        toast.success(data.message)
      } else {
        console.log(data)
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
      toast.error(data.error)
    } finally {
      setIssubmitted(false)
    }
  }

  return (
    <div>
      {issubmitted ? (<div><p>Loading...</p></div>
      ):(
        <>
              <div>
        <p>Login</p>
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
            </div>
            <div>
              <input 
                type="email"
                placeholder='Enter your email address'
                required
                suggested="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
              <label>Password</label>
            </div>
            <div>
              <input 
                type="password"
                placeholder='Enter your password'
                required
                suggested="current-password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                  />
            </div>
            <div>
              <button
                disabled={issubmitted} 
              type='submit'>{issubmitted?'Loading...':'Submit'}</button>
            </div>
          </form>
          <Toaster />
        </div>
      </div>
        </>
      )}
    </div>
  )
}

export default Login