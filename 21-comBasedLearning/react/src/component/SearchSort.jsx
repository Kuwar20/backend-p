import React, { useState } from 'react'

const searchSort = () => {
    const [names, setNames] = useState(["sagar", "kuwar", "sagari", "ayoo", "homeboy",
        "john", "doe", "alice", "bob", "charlie",
        "dave", "eva", "frank", "grace", "helen"]);

    const [search, setSearch] = useState('');
    const [result, setResult] = useState('');

    const handleSearch = (e) => {
        const query = e.target.value;
        console.log(query)
        setSearch(query)

        const searchResult = names.filter((name)=>
        name.toLowerCase().includes(query.toLowerCase())
        )
        
        setResult(searchResult)
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div>
                <div>
                    <label>Search:</label>
                    <input type="text"
                        placeholder='Search Names'
                        className='p-3 border rounded'
                        value={search}
                        onChange={handleSearch}
                    />
                    <h3>Result:</h3>
                    {result}
                </div>
                <h1>Names List:</h1>
                <ul>
                    {names.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default searchSort