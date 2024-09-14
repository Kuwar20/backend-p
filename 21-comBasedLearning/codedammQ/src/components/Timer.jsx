import React, { useState, useEffect } from 'react';

const DateTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timer, setTimer] = useState(120); // Initial timer value in seconds (e.g., 10 minutes)
    const [isTimerActive, setIsTimerActive] = useState(false);

    // Function to update the current time every second
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timeInterval); // Cleanup
    }, []);

    // Function to handle the countdown timer
    useEffect(() => {
        let countdownInterval;
        if (isTimerActive && timer > 0) {
            countdownInterval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        
        return () => clearInterval(countdownInterval); // Cleanup
    }, [isTimerActive, timer]);

    // Extract hours, minutes, seconds, and format the date
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedDate = currentTime.toLocaleDateString();

    // Day names array
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[currentTime.getDay()]; // Get the current day name

    // Format the countdown timer into minutes and seconds
    const formatCountdown = () => {
        const countdownMinutes = Math.floor(timer / 60);
        const countdownSeconds = timer % 60;
        return `${countdownMinutes}:${countdownSeconds < 10 ? `0${countdownSeconds}` : countdownSeconds}`;
    };

    // Handlers for the timer buttons
    const startTimer = () => {
        setIsTimerActive(true);
    };

    const stopTimer = () => {
        setIsTimerActive(false);
    };

    const resetTimer = () => {
        setIsTimerActive(false);
        setTimer(600); // Reset to initial value
    };

    return (
        <div className='flex flex-col h-screen items-center justify-center'>
            <h1 className='text-2xl font-bold mb-2'>Today is: {currentDay}</h1>
            <h2 className='text-xl mb-2'>Current Date: {formattedDate}</h2>
            <h3 className='text-lg mb-4'>
                Time: {hours}:{minutes}:{seconds}
            </h3>
            <div className='text-center mb-4'>
                <h1 className='text-2xl font-bold mb-2'>Countdown Timer</h1>
                <h2 className='text-4xl font-semibold'>
                    {timer > 0 ? formatCountdown() : "Time's up!"}
                </h2>
                <div className='mt-4'>
                    <button 
                        onClick={startTimer} 
                        className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2'>
                        Start
                    </button>
                    <button 
                        onClick={stopTimer} 
                        className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2'>
                        Stop
                    </button>
                    <button 
                        onClick={resetTimer} 
                        className='bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded'>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateTime;
