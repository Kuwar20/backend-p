import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

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
    <div className='min-h-screen bg-slate-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <p className='font-medium text-center text-blue-600 hover:text-blue-500'>Login</p>
          </div>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className=' bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='block text-sm font-medium text-gray-700'>
                  <label>Email</label>
                </div>
                <div className='mt-2'>
                  <input
                    type="email"
                    placeholder='Enter your email address'
                    required
                    suggested="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  />
                </div>
                <div className='block text-sm font-medium text-gray-700'>
                  <label>Password</label>
                </div>
                <div className='mt-2'>
                  <input
                    type="password"
                    placeholder='Enter your password'
                    required
                    suggested="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  />
                </div>
                <div className='mt-1'>
                  <button
                    disabled={issubmitted}
                    type='submit'
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >{issubmitted ? 'Loading...' : 'Submit'}</button>
                </div>
              </form>
              <Toaster />
            </div>
          </div>
    </div>
  )
}

export default Login