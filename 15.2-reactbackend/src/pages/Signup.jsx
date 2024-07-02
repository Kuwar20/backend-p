import React, { useState } from 'react';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className='flex text-center justify-center text-4xl'>
        <h1>Signup Page</h1>
      </div>
      <div className='flex justify-center'>
        <form className='w-1/3'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
              Username
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='Username'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <div className='relative'>
              <input
                className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type={passwordVisible ? 'text' : 'password'}
                placeholder='******************'
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
              >
                {passwordVisible ? (
                  <svg
                    className='h-6 w-6 text-gray-700'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.146.449-.372.88-.66 1.276A10.94 10.94 0 0112 19c-4.478 0-8.268-2.943-9.542-7.724a10.94 10.94 0 01-.66-1.276z'
                    />
                  </svg>
                ) : (
                  <svg
                    className='h-6 w-6 text-gray-700'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7.724a10.94 10.94 0 01-.66-1.276A10.05 10.05 0 0112 5c1.125 0 2.2.182 3.233.525M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6.343 6.343L17.657 17.657'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

