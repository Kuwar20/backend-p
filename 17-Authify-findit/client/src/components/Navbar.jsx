import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiBars3BottomRight } from "react-icons/hi2";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className='bg-gray-500 p-3'>
            <div className='container mx-auto flex justify-between'>
                <div className='ml-6 font-medium text-2xl'>
                    <Link to='/'>Home</Link>
                </div>
                <div className='hidden md:flex space-x-4 mr-12'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/search'>Search</Link>
                </div>
                <div className='md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
                        <HiBars3BottomRight  className='w-6 h-7'/>
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