import React, { useState } from 'react';

const Navbar = ({ links }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md w-full z-10 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="text-xl font-bold text-gray-800">My Logo</div>

                    {/* Links Section for desktop */}
                    <div className="hidden md:flex space-x-8">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
