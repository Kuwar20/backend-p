import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';

const Login1 = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Login successful');
        setEmail('');
        setPassword('');
      } else if (result.meta.requestStatus === 'rejected') {
        toast.error(error);
      } 
      else {
        toast.error(result.payload);
      }
    });
  }

  return (
    <div className='min-h-screen bg-slate-300 flex flex-col justify-center py-12 sm:px-6 lg:px-4'>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <div className='mb-6'>
            <h1 className='text-3xl font-bold'>Login into your Account</h1>
          </div>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='block text-sm font-medium text-gray-700'>
              <label>Email</label>
            </div>
            <div className='mt-1'>
              <input
                type="email"
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
            </div>
            <div className='block text-sm font-medium text-gray-700'>
              <label>Password</label>
            </div>
            <div className='mt-1'>
              <input
                type="password"
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
            </div>
            <div className='text-sm text-right'>
              <a href="" className='text-blue-600 hover:text-blue-700 '>Forgot Your Password ?</a>
            </div>
            <div className='mt-2'>
              <button
                type='submit'
                disabled={loading}
                className='group relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >{loading ? 'Loading...' : 'Login'}</button>
            </div>
          </form>
          <Toaster />
          <div className='mt-6'>
            <div className='relative flex justify-center text-sm'>
              <p className='px-2 bg-gray-50 text-gray-800'>or continue with</p>
            </div>
            <div className='mt-6 grid grid-cols-3 gap-3'>
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

export default Login1