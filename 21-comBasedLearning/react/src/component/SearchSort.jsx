// import React, { useState } from 'react';

// const SearchSort = () => {
//     const [names, setNames] = useState([
//         "sagar", "kuwar", "sagari", "ayoo", "homeboy",
//         "john", "doe", "alice", "bob", "charlie",
//         "dave", "eva", "frank", "grace", "helen"
//     ]);

//     const [search, setSearch] = useState('');
//     const [result, setResult] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     const handleSearch = (e) => {
//         const query = e.target.value;
//         console.log(query);
//         setSearch(query);

//         const searchResult = names.filter((name) =>
//             name.toLowerCase().includes(query.toLowerCase())
//         );

//         setResult(searchResult);
//         setCurrentPage(1);
//     };

//     // Pagination logic
//     const totalPages = Math.ceil(result.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

//     const handleClick = (pageNumber) => setCurrentPage(pageNumber);

//     const handleSort = () => {
//          const sortedNames = [...result].sort((a,b)=>a.localeCompare(b)); // for asc
//         // const sortedNames = [...result].sort((a,b)=>b.localeCompare(a)); // for desc order

//         setResult(sortedNames)
//     }

//     return (
//         <div className='flex justify-center items-center min-h-screen bg-gray-100 p-5'>
//             <div className='flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-lg'>
//                 <div className='mb-4'>
//                     <label className='block text-lg font-medium mb-2'>Search:</label>
//                     <input
//                         type="text"
//                         placeholder='Search Names'
//                         className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
//                         value={search}
//                         onChange={handleSearch}
//                     />
//                     <button onClick={handleSort}>Sort</button>
//                 </div>
//                 <h3 className='text-lg font-medium mb-2'>Result:</h3>
//                 <div className='text-gray-700 mb-4'>
//                     {result.length === 0 ? (
//                         <p>No results found</p>
//                     ) : (
//                         <ul className='list-disc pl-5'>
//                             {result.map((name, index) => (
//                                 <li key={index} className='mb-1'>{name}</li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 <h1 className='text-xl font-bold mb-2'>Names List:</h1>
//                 <ul className='list-disc pl-5 mb-4'>
//                     {currentItems.map((name, index) => (
//                         <li key={index} className='mb-1'>{name}</li>
//                     ))}
//                 </ul>
//                 <div className='flex justify-center'>
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                         <button
//                             key={page}
//                             onClick={() => handleClick(page)}
//                             className={`mx-1 px-3 py-1 border rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 transition`}
//                         >
//                             {page}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SearchSort;

import React, { useState } from 'react';

// Main component for searching and sorting names
const SearchSort = () => {
    // Initial list of names
    const initialNames = [
        "sagar", "kuwar", "sagari", "ayoo", "homeboy",
        "john", "doe", "alice", "bob", "charlie",
        "dave", "eva", "frank", "grace", "helen"
    ];

    // State hooks for managing component data
    // useState is a React Hook that lets you add state to functional components
    const [names] = useState(initialNames);  // List of all names
    const [search, setSearch] = useState('');  // Current search term
    const [sortOrder, setSortOrder] = useState('asc');  // Current sort order ('asc' or 'desc')
    const [currentPage, setCurrentPage] = useState(1);  // Current page number
    const itemsPerPage = 5;  // Number of items to display per page

    // Function to filter names based on search term
    const filterNames = () => {
        return names.filter((name) => 
            name.toLowerCase().includes(search.toLowerCase())
        );
    };

    // Function to sort names based on current sort order
    const sortNames = (namesToSort) => {
        return namesToSort.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.localeCompare(b);  // Sort in ascending order
            } else {
                return b.localeCompare(a);  // Sort in descending order
            }
        });
    };

    // Combine filtering and sorting
    const getFilteredAndSortedNames = () => {
        const filteredNames = filterNames();
        return sortNames(filteredNames);
    };

    // Get the names for the current page
    const getCurrentPageNames = () => {
        const filteredAndSortedNames = getFilteredAndSortedNames();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredAndSortedNames.slice(startIndex, endIndex);
    };

    // Event handler for search input
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);  // Reset to first page on new search
    };

    // Event handler for sort button
    const handleSort = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    // Event handler for pagination
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(getFilteredAndSortedNames().length / itemsPerPage);

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 p-5'>
            <div className='flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-lg'>
                {/* Search input */}
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

                {/* Sort button */}
                <button 
                    onClick={handleSort}
                    className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
                >
                    Sort {sortOrder === 'asc' ? '↑' : '↓'}
                </button>

                {/* Display filtered and sorted names */}
                <h3 className='text-lg font-medium mb-2'>Results:</h3>
                <ul className='list-disc pl-5 mb-4'>
                    {getCurrentPageNames().map((name, index) => (
                        <li key={index} className='mb-1'>{name}</li>
                    ))}
                </ul>

                {/* Pagination */}
                <div className='flex justify-center'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
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