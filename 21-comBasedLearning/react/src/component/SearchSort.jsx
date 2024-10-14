import React, { useState } from 'react';

const SearchSort = () => {
    const [names, setNames] = useState([
        "sagar", "kuwar", "sagari", "ayoo", "homeboy",
        "john", "doe", "alice", "bob", "charlie",
        "dave", "eva", "frank", "grace", "helen"
    ]);

    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleSearch = (e) => {
        const query = e.target.value;
        console.log(query);
        setSearch(query);

        const searchResult = names.filter((name) =>
            name.toLowerCase().includes(query.toLowerCase())
        );

        setResult(searchResult);
        setCurrentPage(1);
    };

    // Pagination logic
    const totalPages = Math.ceil(result.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 p-5'>
            <div className='flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-lg'>
                <div className='mb-4'>
                    <label className='block text-lg font-medium mb-2'>Search:</label>
                    <input
                        type="text"
                        placeholder='Search Names'
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <h3 className='text-lg font-medium mb-2'>Result:</h3>
                <div className='text-gray-700 mb-4'>
                    {result.length === 0 ? (
                        <p>No results found</p>
                    ) : (
                        <ul className='list-disc pl-5'>
                            {result.map((name, index) => (
                                <li key={index} className='mb-1'>{name}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <h1 className='text-xl font-bold mb-2'>Names List:</h1>
                <ul className='list-disc pl-5 mb-4'>
                    {currentItems.map((name, index) => (
                        <li key={index} className='mb-1'>{name}</li>
                    ))}
                </ul>
                <div className='flex justify-center'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handleClick(page)}
                            className={`mx-1 px-3 py-1 border rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 transition`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchSort;
