// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setQuery, setCurrentPage, setSuggestion, searchUsers } from '../store/slices/searchSlice';

// import axios from 'axios';

// const Search = () => {
//     const [query, setQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;
//     const [suggestion, setSuggestion] = useState('');
//     const inputRef = useRef(null);

//     useEffect(() => {
//         if (query) {
//             fetchResults(query, currentPage);
//         }
//     }, [currentPage]);

//     const handleChange = async (event) => {
//         const value = event.target.value;
//         setQuery(value);

//         if (value.length >= 2) {
//             try {
//                 const response = await axios.get(`http://localhost:3000/api/user/search/${value}`, {
//                     params: { name: value, limit: 1 }
//                 });
//                 const match = response.data[0]?.name.toLowerCase().startsWith(value.toLowerCase());
//                 setSuggestion(match ? response.data[0].name.slice(value.length) : '');
//             } catch (error) {
//                 console.error('Error fetching suggestions:', error);
//                 setSuggestion('');
//             }
//         } else {
//             setSuggestion('');
//         }
//     };

//     const handleKeyDown = (event) => {
//         if (event.key === 'ArrowRight' && suggestion) {
//             setQuery(query + suggestion);
//             setSuggestion('');
//         }
//     };

//     const handleSuggestionClick = () => {
//         if (suggestion) {
//             setQuery(query + suggestion);
//             setSuggestion('');
//             inputRef.current.focus();
//         }
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setCurrentPage(1);
//         fetchResults(query, 1);
//     };

//     const fetchResults = async (query, page) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:3000/api/user/search/${query}`, {
//                 params: { name: query, page, limit: itemsPerPage }
//             });
//             setSearchResults(response.data);
//             console.log('API response:', response.data);  // Add this line
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setSearchResults([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto mt-8">
//             <h1 className="text-3xl font-bold text-center mb-6">Search Page</h1>
//             <form onSubmit={handleSubmit} className="flex items-center justify-center">
//                 <div className="relative w-full max-w-lg">
//                     <input
//                         ref={inputRef}
//                         type="text"
//                         value={query}
//                         onChange={handleChange}
//                         onKeyDown={handleKeyDown}
//                         placeholder="Enter search query..."
//                         spellCheck="false"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                     {suggestion && (
//                         <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" onClick={handleSuggestionClick}>
//                             <span className="pl-4">
//                                 {query}
//                                 <span className="text-gray-400 cursor-pointer">{suggestion}</span>
//                             </span>
//                         </div>
//                     )}
//                 </div>
//                 <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 focus:outline-none">Search</button>
//             </form>

//             {loading && <p className="text-center mt-4">Loading...</p>}

//             <div className="mt-8">
//                 {searchResults.length > 0 ? (
//                     <ul className="divide-y divide-gray-200">
//                         {searchResults.map(result => (
//                             <li key={result._id} className="py-4">
//                                 <p className="text-lg font-medium">{result.name}</p>
//                                 <p className="text-gray-500">{result.email}</p>
//                                 <p className="text-gray-500">Created: {new Date(result.date).toLocaleString()}</p>
//                                 {/* <p className="text-gray-500">Created: {result.date}</p> */} {/* this will output Created: 2024-07-03T13:59:12.691Z */}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     !loading && <p className="text-center mt-4">No results found.</p>
//                 )}
//             </div>

//             {searchResults.length > 0 && (
//                 <div className="flex justify-center mt-4">
//                     <button
//                         onClick={() => setCurrentPage(prevPage => prevPage - 1)}
//                         disabled={currentPage === 1}
//                         className="bg-indigo-500 text-white px-4 py-2 rounded-l-md hover:bg-indigo-600 focus:outline-none disabled:bg-gray-400"
//                     >
//                         Previous
//                     </button>
//                     <button
//                         onClick={() => setCurrentPage(prevPage => prevPage + 1)}
//                         disabled={searchResults.length < itemsPerPage}
//                         className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 focus:outline-none disabled:bg-gray-400"
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Search;




import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, setCurrentPage, setSuggestion, searchUsers } from '../store/slices/searchSlice';
import axios from 'axios';

const Search = () => {
    const dispatch = useDispatch();
    const { query, results, loading, currentPage, suggestion } = useSelector((state) => state.search);
    const itemsPerPage = 5;
    const inputRef = useRef(null);

    const handleChange = async (event) => {
        const value = event.target.value;
        dispatch(setQuery(value));

        if (value.length >= 2) {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/search/${value}`, {
                    params: { name: value, limit: 1 }
                });
                const match = response.data[0]?.name.toLowerCase().startsWith(value.toLowerCase());
                dispatch(setSuggestion(match ? response.data[0].name.slice(value.length) : ''));
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                dispatch(setSuggestion(''));
            }
        } else {
            dispatch(setSuggestion(''));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight' && suggestion) {
            dispatch(setQuery(query + suggestion));
            dispatch(setSuggestion(''));
        }
    };

    const handleSuggestionClick = () => {
        if (suggestion) {
            dispatch(setQuery(query + suggestion));
            dispatch(setSuggestion(''));
            inputRef.current.focus();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setCurrentPage(1));
        dispatch(searchUsers({ query, page: 1, limit: itemsPerPage }));
    };

    useEffect(() => {
        if (query) {
            dispatch(searchUsers({ query, page: currentPage, limit: itemsPerPage }));
        }
    }, [currentPage, query, dispatch]);

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center mb-6">Search Page</h1>
            <form onSubmit={handleSubmit} className="flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter search query..."
                        spellCheck="false"
                        className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {suggestion && (
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" onClick={handleSuggestionClick}>
                            <span className="pl-4">
                                {query}
                                <span className="text-gray-400 cursor-pointer">{suggestion}</span>
                            </span>
                        </div>
                    )}
                </div>
                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 focus:outline-none">Search</button>
            </form>

            {loading && <p className="text-center mt-4">Loading...</p>}

            <div className="mt-8">
                {results.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {results.map(result => (
                            <li key={result._id} className="py-4">
                                <p className="text-lg font-medium">{result.name}</p>
                                <p className="text-gray-500">{result.email}</p>
                                <p className="text-gray-500">Created: {new Date(result.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p className="text-center mt-4">No results found.</p>
                )}
            </div>

            {results.length > 0 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                        disabled={currentPage === 1}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-l-md hover:bg-indigo-600 focus:outline-none disabled:bg-gray-400"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                        disabled={results.length < itemsPerPage}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 focus:outline-none disabled:bg-gray-400"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Search;


