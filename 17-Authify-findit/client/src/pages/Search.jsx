import React, { useState, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const Search = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [suggestion, setSuggestion] = useState('');
    const inputRef = useRef(null);

    const handleChange = async (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length >= 2) {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/search/${value}`, {
                    params: { page: 1, limit: 1 }
                });
                const result = response.data.UserFromsearchResults[0]?.user;
                if (result) {
                    const matchFirstName = result.firstName.toLowerCase().startsWith(value.toLowerCase());
                    const matchLastName = result.lastName.toLowerCase().startsWith(value.toLowerCase());
                    const matchEmail = result.email.toLowerCase().startsWith(value.toLowerCase());
                    
                    if (matchFirstName) {
                        setSuggestion(result.firstName.slice(value.length));
                    } else if (matchLastName) {
                        setSuggestion(result.lastName.slice(value.length));
                    } else if (matchEmail) {
                        setSuggestion(result.email.slice(value.length));
                    } else {
                        setSuggestion('');
                    }
                } else {
                    setSuggestion('');
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestion('');
            }
        } else {
            setSuggestion('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight' && suggestion) {
            setQuery(query + suggestion);
            setSuggestion('');
        }
    };

    const handleSuggestionClick = () => {
        if (suggestion) {
            setQuery(query + suggestion);
            setSuggestion('');
            inputRef.current.focus();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter Something to search');
            return;
        }
        setCurrentPage(1);
        fetchResults(query, 1);
    };

    const fetchResults = async (query, page) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/user/search/${query}`, {
                params: { page, limit: 5 }
            });
            setSearchResults(response.data.UserFromsearchResults);
            setTotalPages(response.data.pagination.totalPages);
            console.log('API response:', response.data);
            console.log('Search results:', response.data.UserFromsearchResults);
        } catch (error) {
            console.error('Error fetching data:', error);
            
            if (error.response) {
                toast.error(error.response.data.error || 'An error occurred while fetching data');
            } else if (error.request) {
                toast.error('No response received from server');
            } else {
                toast.error('Error setting up the request');
            }
            setSearchResults([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchResults(query, newPage);
    };

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
                        placeholder="Search by name or email..."
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
            <Toaster />
            {loading && <p className="text-center mt-4">Loading...</p>}

            <div className="mt-8">
                {searchResults.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {searchResults.map(result => (
                            <li key={result.user._id} className="py-4">
                                <p className="text-lg font-medium">{result.user.firstName} {result.user.lastName}</p>
                                <p className="text-gray-500">{result.user.email}</p>
                                <p className="text-gray-500">Created: {result.user.createdAt}</p>
                                <p className="text-gray-500">Signup Date: {result.log.signupDate}</p>
                                <p className="text-gray-500">Last Login: {result.log.lastLogin}</p>
                                <p className="text-gray-500">Number of Logins: {result.log.numberOfLogins}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p className="text-center mt-4">No results found.</p>
                )}
            </div>

            {searchResults.length > 0 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-l-md hover:bg-indigo-600 focus:outline-none disabled:bg-gray-400"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
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