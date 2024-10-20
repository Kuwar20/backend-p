import React, { useState } from 'react'

const SearchSort2 = () => {
    const namesList = ["sagar", "kuwar", "sagari", "ayoo", "homeboy",
        "john", "doe", "alice", "bob", "charlie",
        "dave", "eva", "frank", "grace", "helen"]
    const [names] = useState(namesList)

    const [search, setSearch] = useState('')

    const [sortOrder, setSortOrder] = useState('asc');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    // console.log(names.sort())
    // console.log(names.includes("sagar"))
    // console.log(...namesList.sort())
    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
        setCurrentPage(1);  // Reset to first page on new search
    }

    const searchedName = () => {
        const filteredName= names.filter((name) => (
            name.toLowerCase().includes(search.toLowerCase())
        ))
        return sortNames(filteredName)
    }
    
    const sortNames = (namesToSort) => {
        return namesToSort.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        })  
    }
    
    const handleSort = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    }
    
    const totalPages = Math.ceil(searchedName().length / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

    const currentItems = searchedName().slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100 p-5'>
            <div className='flex'>
                <label>Search:
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder='Search Names'
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                    />
                </label>
                <button onClick={handleSort}>Sort {sortOrder === 'asc' ? '↑' : '↓'}</button>
            </div>
            <div className='flex'>
                <div>
                    <h3>All Names</h3>
                    <ul className='list-disc'>
                        {names.map((name, index) => (
                            <li key={index} className='mb-1'>{name}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>Search Result</h3>
                    <ol className='list-decimal pl-5'>
                        {currentItems.map((name, index) => (
                            <li key={index} className='mb-1'>{name}</li>
                        ))}
                    </ol>
                    <div className='mt-4 flex justify-center'>
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`mx-1 px-3 py-1 border ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'}`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSort2