import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className='bg-gray-500 p-3'>
            <div className='container mx-auto flex justify-between'>
                <div className='ml-6 font-semibold text-2xl'>
                    <Link to='/'>Home</Link>
                </div>
                <div className='hidden md:flex space-x-4 mr-12'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/search'>Search</Link>
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
                <div className='md:hidden flex flex-col space-y-4 p-6'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/search'>Search</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar