// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/">E-Shop</Link>
                </div>

                <ul className="flex space-x-6">
                    {/* Products Dropdown */}
                    <li className="group relative">
                        <Link to="#" className="hover:text-blue-500">
                            Products
                        </Link>
                        <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block">
                            <Link to="/category/electronics" className="block px-4 py-2 hover:bg-gray-100">
                                Electronics
                            </Link>
                            <Link to="/category/fashion" className="block px-4 py-2 hover:bg-gray-100">
                                Fashion
                            </Link>
                            <Link to="/category/home-appliances" className="block px-4 py-2 hover:bg-gray-100">
                                Home Appliances
                            </Link>
                            <Link to="/category/sports" className="block px-4 py-2 hover:bg-gray-100">
                                Sports
                            </Link>
                        </div>
                    </li>

                    {/* Account Dropdown */}
                    <li className="group relative">
                        <Link to="#" className="hover:text-blue-500">
                            Account
                        </Link>
                        <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block">
                            <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                                Login
                            </Link>
                            <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">
                                Register
                            </Link>
                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                Profile
                            </Link>
                            <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                                Orders
                            </Link>
                        </div>
                    </li>

                    {/* Cart Link */}
                    <li>
                        <Link to="/cart" className="hover:text-blue-500">
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
