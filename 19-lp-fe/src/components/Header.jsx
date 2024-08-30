import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
                E-Shop
            </div>
            <div className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h18l-1.68 8.04a4 4 0 01-3.96 3.96H7.64a4 4 0 01-3.96-3.96L2 3z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 3l2 14.49A4 4 0 008 21h8a4 4 0 004-3.51L22 3M10 8h4"
                    />
                </svg>
                <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs px-2 py-1">
                    {totalQuantity}
                </span>
            </div>
        </header>
    );
};

export default Header;
