import React, { useState } from 'react'

const SearchSort2 = () => {
    const namesList = ["sagar", "kuwar", "sagari", "ayoo", "homeboy",
        "john", "doe", "alice", "bob", "charlie",
        "dave", "eva", "frank", "grace", "helen"]
    const [names] = useState(namesList)
    return (
        <div>
            <div className='flex justify-center items-center min-h-screen bg-gray-100 p-5'>
                <ul className='list-disc'>
                    {names.map((name, index) => (
                        <li key={index} className='mb-1'>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchSort2