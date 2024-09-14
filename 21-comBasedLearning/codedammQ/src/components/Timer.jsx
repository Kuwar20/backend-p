import React, { useState, useEffect } from 'react';

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000 ms (1 second)

    // Cleanup function to clear the timer when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Extract hours, minutes, seconds, and format the date
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const formattedDate = currentTime.toLocaleDateString();

  // Day names array
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[currentTime.getDay()]; // Get the current day name

  return (
    <div>
      <h1>Today is: {currentDay}</h1> {/* Display current day */}
      <h2>Current Date: {formattedDate}</h2> {/* Display current date */}
      <h3>
        Time: {hours}:{minutes}:{seconds}
      </h3> {/* Display current time */}
    </div>
  );
};

export default DateTime;
