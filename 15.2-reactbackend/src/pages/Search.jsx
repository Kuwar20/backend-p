
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (query) {
            fetchResults(query, currentPage);
        }
    }, [currentPage]);

    const handleChange = async (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length > 2) { // Adjust the threshold as needed
            try {
                const response = await axios.get(`https://666fc0fe0900b5f872481dcc.mockapi.io/crud`, {
                    params: {
                        name: value,
                        limit: 5 // Limit the number of suggestions
                    }
                });
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(1); // Reset to the first page on new search
        fetchResults(query, 1);
    };

    const fetchResults = async (query, page) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://666fc0fe0900b5f872481dcc.mockapi.io/crud`, {
                params: {
                    name: query,
                    page: page,
                    limit: itemsPerPage
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.name);
        setSuggestions([]);
        fetchResults(suggestion.name, 1);
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center mb-6">Search Page</h1>
            <form onSubmit={handleSubmit} className="flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Enter search query..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 focus:outline-none"
                >
                    Search
                </button>
            </form>

            {loading && <p className="text-center mt-4">Loading...</p>}

            <div className="mt-8">
                {searchResults.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {searchResults.map((result) => (
                            <li key={result.id} className="py-4">
                                <p className="text-lg font-medium">{result.name}</p>
                                <p className="text-gray-500">{result.email}</p>
                                <p className="text-gray-500">{result.age}</p>
                                <p className="text-gray-500">{result.gender}</p>
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
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-l-md hover:bg-indigo-600 focus:outline-none disabled:bg-gray-400"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={searchResults.length < itemsPerPage}
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
