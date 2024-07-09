import React from 'react'

const Signup = () => {
  return (
    <div className='bg-slate-200 min-h-screen flex flex-col justify-center'>
      <div className='bg-white sm:mx-auto sm:w-full sm:max-w-md py-8 px-4 sm:px-10 sm:rounded-lg shadow'>
        <div className='mb-6'>
          <p className='text-3xl font-bold text-center'>Register</p>
        </div>
        <form className='space-y-4'>
          <div className='text-sm font-medium text-gray-700'>
            <label>First Name</label>
          </div>
          <div>
            <input
              type='text'
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
              placeholder='Password'
              className='mb-3 w-full border rounded-md px-3 py-2 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-900'
            />
          </div>
          <div className='mt-2'>
            <button className='bg-green-500 hover:bg-green-700 text-white w-full p-2 rounded-md'>Signup</button>
          </div>
        </form>
        <div className='mt-6'>
          <div className='flex justify-center text-sm mb-2'>
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