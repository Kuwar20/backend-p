import React, { useState } from 'react'

const searchSort = () => {
    const [names, setNames] = useState(["sagar", "kuwar", "sagari", "ayoo", "homeboy",
        "john", "doe", "alice", "bob", "charlie",
        "dave", "eva", "frank", "grace", "helen"]);

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div>
                <h1>Names List:</h1>
                <ul>
                    {names.map((name,index)=>(
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default searchSort