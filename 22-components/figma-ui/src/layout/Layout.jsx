import React from 'react'
import NavList from '../components/NavList'

const Layout = ({ children }) => {
    return (
        <div className='flex flex-col'>
            <header>
                <NavList />
            </header>
            <main className='flex-grow'>
                {children}
            </main>
            <footer className='bg-gray-800 text-white text-center p-4 mt-10'>
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
        </div>
    )
}

export default Layout