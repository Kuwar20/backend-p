import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [issubmitted, setIssubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIssubmitted(true)
    try {
      const response = await fetch('http://localhost:3000/api/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message)
      } else {
        toast.error(data.error)
      }
      console.log(data)
    } catch (error) {
      console.error(error)
      toast.error(data.error)
    } finally {
      setIssubmitted(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <p className='font-medium text-center text-blue-600 hover:text-blue-500'>Create your Account</p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Name
              </label>
            </div>
            <div className='mt-1'>
              <input
                type="text"
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
            </div>
            <div className='mt-1'>
              <input
                type="email"
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Password</label>
            </div>
            <div className='mt-1'>
              <input
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
            </div>
            <div className='text-sm'>
              <Link to=''
                className='font-medium text-blue-600 hover:text-blue-500'>Forget Your Password</Link>
            </div>
            <div>
              <button type='submit'
                disabled={issubmitted}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >{issubmitted ? 'Loading...' : 'Submit'}</button>
            </div>
            <Toaster />
          </form>
          <div className='mt-6'>
            <div className='relative'>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-50 text-gray-800'>Or continue with</span>
              </div>
            </div>
            <div>
              <div>
                <div className='mt-6 grid grid-cols-3 gap-2'>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                      alt="Facebook"
                    />
                  </a>
                  <div>
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        className="h-5 w-5"
                        src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                        alt="Twitter"
                      />
                    </a>

                  </div>
                  <div>
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        className="h-6 w-6"
                        src="https://www.svgrepo.com/show/506498/google.svg"
                        alt="Google"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup