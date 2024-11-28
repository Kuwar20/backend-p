import React, { useState } from 'react'
import Img from '../assets/T.png'

const Navbar = ({ navItems }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    console.log({ navItems })

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className='w-full bg-gray-200 shadow-sm'>
            <div className='container mx-auto flex justify-between p-4'>

                <div className='flex items-center ml-10'>
                    <div className='bg-blue-500 p-1 rounded-full'>
                        <img src={Img} alt="img" className='w-5 h-5 object-contain' />
                    </div>
                    <h2 className='ml-2'>Website Name</h2>
                </div>

                {/* <div className='hidden md:flex'>
                    <ul className='flex space-x-4 mr-10 font-light'>
                        <li className='font-semibold'>Home</li>
                        <li>Find a doctor</li>
                        <li>App</li>
                        <li>Testimonials</li>
                        <li>About us</li>
                    </ul>
                </div> */}

                <div className='hidden md:flex'>
                    <ul className='flex space-x-4 mr-10 font-light'>
                        {
                            navItems.map((item, index) => (
                                <li key={index} className='inline-block ml-4'>{item.name}</li>
                            ))
                        }
                    </ul>
                </div>

                <div className='md:hidden'>
                    <button
                        onClick={toggleMenu}
                    >
                        {
                            isMenuOpen ?
                                (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )
                        }
                    </button>

                    {/* {
                        isMenuOpen && (
                            <div className='absolute left-0 right-0 mt-4'>
                                <div className='px-2 pt-2 pb-3 space-y-1'>
                                    <a href="" className='block'>Home</a>
                                    <a href="" className='block'>About</a>
                                    <a href="" className='block'>Services</a>
                                    <a href="" className='block'>Contact</a>
                                </div>
                            </div>
                        )
                    } */}

                    {
                        isMenuOpen && (
                            <div className='absolute left-0 right-0 mt-4'>
                                <div className='px-2 pt-2 pb-3 space-y-1'>
                                    {
                                        navItems.map((item, index) => (
                                            <a key={index} href={item.link} className='block'>{item.name}</a>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>

    )
}

export default Navbar