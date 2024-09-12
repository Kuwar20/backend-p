import React, { useState } from 'react';

const SIcalc = () => {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [result, setResult] = useState(null);

    const CalculateSI = (e) => {
        e.preventDefault();
        const SI = (principal * rate * time) / 100;
        setResult(SI);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Simple Interest Calculator
                </h1>
                <form onSubmit={CalculateSI} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Principal Amount
                        </label>
                        <input
                            type="number"
                            value={principal}
                            min={0}
                            onChange={(e) => setPrincipal(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter Principal Amount"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Rate of Interest (%)
                        </label>
                        <input
                            type="number"
                            value={rate}
                            min={0}
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter Rate of Interest"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Time (in years)
                        </label>
                        <input
                            type="number"
                            value={time}
                            min={0}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter Time in Years"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Calculate
                    </button>
                </form>

                {result !== null && (
                    <h2 className="text-xl font-semibold text-center mt-6">
                        Simple Interest: {result.toFixed(2)}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default SIcalc;
