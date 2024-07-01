import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='bg-gray-800 p-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='text-white text-xl font-bold'>Name</div>
                <div className='hidden md:flex space-x-4'>
                    <a href='#' className='text-white'>Login</a>
                    <a href='#' className='text-white'>Signup</a>
                    <button className='text-white bg-red-500 px-4 py-2 rounded'>Signout</button>
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
                    <a href='#' className='block text-white py-2 px-4'>Login</a>
                    <a href='#' className='block text-white py-2 px-4'>Signup</a>
                    <button className='block text-white bg-red-500 px-4 py-2 rounded m-2'>Signout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
