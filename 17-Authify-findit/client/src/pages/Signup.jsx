import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleLogin = (e) => {
    setIsSubmitted(true)
    e.preventDefault()

    console.log(firstName, lastName, email, password)
    toast.success('Signup successful')
    // 1- output the form data to the console
    // const formData = new FormData(e.target)
    // const data = Object.fromEntries(formData)
    // console.log('Form data:', data)
    // console.log('First Name:', data.first_name)

    // // 2- output the form data to the console
    // const formData = new FormData(e.target);
    // const data = {
    //   firstName: formData.get('first_name'),
    //   lastName: formData.get('last_name'),
    //   email: formData.get('email'),
    //   password: formData.get('password'),
    // };
    // console.log(data);
    // console.log(e.target)
  }

  return (
    <div className='bg-slate-200 min-h-screen flex flex-col justify-center'>
      <div className='bg-white sm:mx-auto sm:w-full sm:max-w-md py-8 px-4 sm:px-10 sm:rounded-lg shadow'>
        <div className='mb-6'>
          <p className='text-3xl font-bold text-center'>Register</p>
        </div>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div className='text-sm font-medium text-gray-700'>
            <label>First Name</label>
          </div>
          <div>
            <input
              type='text'
              //name='first_name'
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                console.log('first name:', e.target.value)
              }}
              placeholder='First Name'
              className='w-full border rounded-md px-3 py-2 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-900'
            />
          </div>
          <div className='text-sm font-medium text-gray-700'>
            <label>Last Name</label>
          </div>
          <div>
            <input
              type='text'
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                console.log('last name:', e.target.value)
              }}
              //name='last_name'
              placeholder='Last Name'
              className='w-full border rounded-md px-3 py-2 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-900'
            />
          </div>
          <div className='text-sm font-medium text-gray-700'>
            <label>Email</label>
          </div>
          <div>
            <input
              type='email'
              //name='email'
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                console.log('email:', e.target.value)
              }}
              placeholder='Email'
              className='w-full border rounded-md px-3 py-2 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-900'
            />
          </div>
          <div className='block text-sm font-medium text-gray-700'>
            <label>Password</label>
          </div>
          <div className=''>
            <input
              type='password'
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log('password:', e.target.value)
              }}
              //name='password'
              placeholder='Password'
              className='mb-3 w-full border rounded-md px-3 py-2 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-900'
            />
          </div>
          <div className='text-right'>
            <Link to='/login' className='text-sm hover:underline cursor-pointer'>Already a user? Login here</Link>
          </div>
          <div className='mt-2'>
            <button
              disabled={isSubmitted}
              className='bg-green-500 hover:bg-green-700 text-white w-full p-2 rounded-md'
            >{isSubmitted ? 'Loading...' : 'Signup'}</button>
          </div>
        </form>
        <Toaster />
        <div className='mt-6'>
          <div className='flex justify-center text-sm mb-3'>
            <p className='px-2 text-gray-800 bg-slate-300 rounded-md'>or continue with</p>
          </div>
          <div className='grid grid-cols-3 gap-3'>
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
  )
}

export default Signup