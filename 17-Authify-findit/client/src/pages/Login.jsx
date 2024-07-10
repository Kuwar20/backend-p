import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('login:', {email}, {password})
    console.log('login:', {email, password})
    console.log('login', email, password)
  }

  return (
    // substract the height of the navbar from the viewport height
    <div className='bg-slate-200 min-h-[calc(100vh-3.5rem)] flex flex-col justify-center'>
      <div className='bg-white sm:mx-auto sm:max-w-md sm:w-full py-8 px-4 sm:px-10 sm:rounded-md shadow'>
        <div className='mb-6'>
          <h1 className='font-bold text-3xl text-center'>Login</h1>
        </div>
        <div>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='text-sm font-medium text-gray-700'>
              <label>Email</label>
            </div>
            <div>
              <input type="email"
                placeholder='Enter your email'
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  console.log("email", e.target.value)
                }}
                className='border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500'
              />
            </div>
            <div className='text-sm font-medium text-gray-700'>
              <label>Password</label>
            </div>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  console.log("password", e.target.value)
                }}
                className='mb-2 border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500'
              />
              <div
                className='absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className='h-6 w-5 text-gray-700' /> : <FaEye className='h-5 w-5 text-gray-700' />}
              </div>
            </div>
            <div className='hover:underline text-sm flex flex-row-reverse'>
              <Link className='hover:underline' to='/signup'>New here? Signup here</Link>
            </div>
            <div>
              <button className='w-full rounded-md p-2.5 bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-200'>Login</button>
            </div>
          </form>
          <div className='mt-4'>
            <div className='flex justify-center'>
              <p className='px-2 text-gray-800 bg-slate-300 rounded-md'>or continue with</p>
            </div>
            <div className='mt-4 grid grid-cols-3 gap-3'>
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
  )
}

export default Login