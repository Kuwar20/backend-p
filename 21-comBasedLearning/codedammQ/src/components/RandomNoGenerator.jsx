import React, { useState } from 'react';

const RandomNoGenerator = () => {
    const [upperLimit, setUpperLimit] = useState('');
    const [lowerLimit, setLowerLimit] = useState('');
    const [randomNo, setRandomNo] = useState(0);

    const GenerateRandomNumber = () => {
        let randomNo = Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
        setRandomNo(randomNo);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 ">
            <h1 className="text-2xl font-bold mb-4">Random Number Generator</h1>

            <div className="mb-4">
                <label className="block mb-2">Lower limit</label>
                <input
                    type="number"
                    value={lowerLimit}
                    onChange={(e) => setLowerLimit(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Upper limit</label>
                <input
                    type="number"
                    value={upperLimit}
                    onChange={(e) => setUpperLimit(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>

            <button
                onClick={GenerateRandomNumber}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Generate
            </button>

            <h2 className="text-xl font-semibold">Random Number: {randomNo}</h2>
        </div>
    );
};

export default RandomNoGenerator;
