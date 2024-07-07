// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className='bg-gray-500 p-4'>
//       <div className='container mx-auto flex justify-between items-center'>
//         <div className='text-white text-2xl font-bold'>
//           <Link to=''>Kuwar</Link>
//         </div>
//         <div className='hidden md:flex space-x-4 text-white'>
//           <Link to='/login'>Login</Link>
//           <Link to='/signup'>Signup</Link>
//           <Link to='/search'>Search</Link>
//         </div>
//         <div className='md:hidden'>
//           <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
//             <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
//               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       {isOpen && (
//         <div className='md:hidden'>
//           <Link to='/login' className='block text-white py-2 px-4'>Login</Link>
//           <Link to='/signup' className='block text-white py-2 px-4'>Signup</Link>
//           <Link to='/search' className='block text-white py-2 px-4'>Search</Link>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='bg-gray-500 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white text-2xl font-bold'>
          <Link to='/'>Kuwar</Link>
        </div>
        <div className='hidden md:flex space-x-4 text-white'>
          {isAuthenticated ? (
            <>
              <p>Hello {user.email}</p>
              <p>id{user._id}</p>
              <Link to='/search'>Search</Link>
              <button onClick={handleLogout} className='text-white'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </>
          )}
        </div>
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden'>
          {isAuthenticated ? (
            <>
              <Link to='/search' className='block text-white py-2 px-4'>Search</Link>
              <button onClick={handleLogout} className='block text-white py-2 px-4'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/login' className='block text-white py-2 px-4'>Login</Link>
              <Link to='/signup' className='block text-white py-2 px-4'>Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
