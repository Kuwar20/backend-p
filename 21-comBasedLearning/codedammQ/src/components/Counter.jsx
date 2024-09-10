import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Counter: {count}</h1>
            <button
                onClick={() => setCount(prevCount => prevCount + 3)}
                className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
            >Increment 3 times</button>
        </div>
    )
}

export default Counter