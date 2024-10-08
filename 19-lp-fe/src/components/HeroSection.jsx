import React, { useRef } from 'react';

const HeroSection = () => {

    const targetRef = useRef(null);

    const handleClick = () => {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <div className="bg-blue-600 text-white p-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to E-Shop</h1>
            <p className="text-xl mb-8">Find the best products here at unbeatable prices!</p>
            <button
                onClick={handleClick}
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold">
                Shop Now
            </button>
            <div ref={targetRef} id="targetSection"></div>
        </div>
    );
};

export default HeroSection;
