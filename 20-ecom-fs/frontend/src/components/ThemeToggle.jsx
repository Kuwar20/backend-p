import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() =>
        window.localStorage.getItem('dark-mode') === 'true'
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        window.localStorage.setItem('dark-mode', darkMode.toString());
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded flex items-center"
        >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
    );
};

export default ThemeToggle;
