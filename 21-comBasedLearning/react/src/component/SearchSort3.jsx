// import React, { useState } from 'react'

// const SearchSort3 = () => {
//     const nameList = ["sagar", "kuwar", "sagari", "ayoo", "homeboy",
//         "john", "doe", "alice", "bob", "charlie",
//         "dave", "eva", "frank", "grace", "helen"]
//     const [names] = useState(nameList);
//     const [search, setSearch] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;
//     const [sortOrder, setSortOrder] = useState('asc');

//     const handleSearch = (e) => {
//         setSearch(e.target.value)
//     }

//     const sortNames = (namesToSort) => {
//         return namesToSort.sort((a, b) => {
//             if (sortOrder === 'asc') {
//                 return a.localeCompare(b); // Ascending order
//             } else {
//                 return b.localeCompare(a); // Descending order
//             }
//         });
//     };

//     const searchedName = () => {
//         const filteredNames = names.filter((name) => (
//             name.toLowerCase().includes(search.toLowerCase())
//         ));
//         return sortNames(filteredNames);  // Sort the filtered names
//     };


//     const handleSort = () => {
//         setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
//     };


//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = searchedName().slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(searchedName().length / itemsPerPage);




//     return (
//         <div className='flex flex-col justify-center items-center min-h-screen'>
//             <div className=''>
//                 <label>
//                     Search:
//                     <input
//                         type="text"
//                         value={search}
//                         onChange={handleSearch}
//                         placeholder='Search'
//                         className='border p-2 rounded-lg'
//                     />
//                 </label>
//                 <div>
//                     <button onClick={handleSort} className='border p-2 rounded-lg'>
//                         Sort {sortOrder === 'asc' ? '↑' : '↓'}
//                     </button>
//                 </div>
//             </div>
//             <div className='flex'>
//                 <h3>All Names:</h3>
//                 <ul>
//                     {
//                         names.map((name, index) => (
//                             <li key={index}>{name}</li>
//                         ))
//                     }
//                 </ul>
//                 <h3>searched Names:</h3>
//                 <ul>
//                     {
//                         currentItems.map((name, index) => (
//                             <li key={index}>{name}</li>
//                         ))
//                     }
//                 </ul>
//             </div>
//             <div>
//                 {/* Pagination buttons */}
//                 <div className='pagination'>
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index + 1}
//                             onClick={() => setCurrentPage(index + 1)}
//                             className={currentPage === index + 1 ? 'active' : ''}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SearchSort3

import React, { useState } from 'react'

const SearchSort3 = () => {
    const nameList = ["sagar", "kuwar", "sagari", "ayoo", "homeboy",
        "john", "doe", "alice", "bob", "charlie",
        "dave", "eva", "frank", "grace", "helen"]
    const [names] = useState(nameList);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const sortNames = (namesToSort) => {
        return namesToSort.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.localeCompare(b); // Ascending order
            } else {
                return b.localeCompare(a); // Descending order
            }
        });
    };

    const searchedName = () => {
        const filteredNames = names.filter((name) => (
            name.toLowerCase().includes(search.toLowerCase())
        ));
        return sortNames(filteredNames);  // Sort the filtered names
    };

    const handleSort = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchedName().slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(searchedName().length / itemsPerPage);

    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-4xl p-6 bg-white rounded-lg shadow-md'>
                <div className='mb-6 flex flex-col sm:flex-row justify-between items-center'>
                    <div className='mb-4 sm:mb-0'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='search'>
                            Search:
                        </label>
                        <input
                            id='search'
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder='Search'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <button 
                        onClick={handleSort} 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Sort {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='w-full md:w-1/2 mb-6 md:mb-0'>
                        <h3 className='text-lg font-semibold mb-2'>All Names:</h3>
                        <ul className='bg-gray-100 rounded-lg p-4'>
                            {names.map((name, index) => (
                                <li key={index} className='mb-1'>{name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='w-full md:w-1/2'>
                        <h3 className='text-lg font-semibold mb-2'>Searched Names:</h3>
                        <ul className='bg-gray-100 rounded-lg p-4'>
                            {currentItems.map((name, index) => (
                                <li key={index} className='mb-1'>{name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='mt-6'>
                    <div className='flex justify-center space-x-2'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSort3