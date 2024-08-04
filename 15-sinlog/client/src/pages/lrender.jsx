import React, { useState } from 'react';

const Counter = () => {
    // State hook
    const [count, setCount] = useState(0);

    // Handler to increment the count
    const increment = () => {
        setCount(count + 1);
    };

    // Render method
    return (
        <div>
            <p>Current Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};

export default Counter;
