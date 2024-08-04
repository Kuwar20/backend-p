import React from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <header className="w-full py-6 bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <motion.div
                        className="text-2xl font-bold text-blue-600"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        BrandName
                    </motion.div>
                    <nav>
                        <motion.ul className="flex space-x-6">
                            {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <a href="#" className="text-gray-700 hover:text-blue-600">{item}</a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center">
                <motion.h1
                    className="text-5xl font-bold text-gray-900 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome to Our Website
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-700 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Discover our amazing services and features. We are here to help you succeed.
                </motion.p>
                <motion.a
                    href="#"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Get Started
                </motion.a>
            </main>

            <footer className="w-full py-4 bg-white shadow-md">
                <div className="container mx-auto text-center text-gray-600">
                    © 2024 BrandName. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;