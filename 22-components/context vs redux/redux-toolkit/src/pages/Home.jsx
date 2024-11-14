// src/pages/Home.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const userName = useSelector((state) => state.user.userName);

    return (
        <div className="p-5 text-center">
            <h1 className="text-2xl">Welcome, {userName}!</h1>
        </div>
    );
};

export default Home;
