import React, { useEffect, useState } from "react";

const RsearchSort = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('')
    const [sortOrder, setSortOrder] = useState('asc');

    const [currentPage, setCurrentPage] = useState(1); // Current page
    const itemsPerPage = 5; // Items per page

    useEffect(() => {
        const fethData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/`);
            const data = await response.json();
            setProducts(data);
            console.log(data);
        };
        fethData();
    }, []);

    const handleSort = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    }

    const sortProducts = (namesToSort) => {
        return namesToSort.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title); // Ascending order
            } else {
                return b.title.localeCompare(a.title); // Descending order
            }
        });
    };

    const sortedProducts = sortProducts([...products]); // Create a new array to avoid mutating state directly

    const searchedProduct = sortedProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    )
    const indexOfLastProduct = currentPage * itemsPerPage; // Last product index
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage; // First product index
    const currentProducts = searchedProduct.slice(indexOfFirstProduct, indexOfLastProduct); // Products for the current page

    // Calculate total pages
    const totalPages = Math.ceil(searchedProduct.length / itemsPerPage);

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setCurrentPage(1); // Reset to first page when search changes
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div>
                <h2>Products</h2>
                <label>Search:
                    <input type="text"
                        placeholder="Enter product to search"
                        className="p-2 m-2 rounded-lg border"
                        value={search}
                        onChange={handleSearch}
                    />
                </label>
                <button onClick={handleSort}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >Sort {sortOrder === 'asc' ? '↑' : '↓'} </button>
                <ol className="list-decimal">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <li key={product.id}>
                                {product.title}
                                <img src={product.image} alt={product.title}
                                    className="object-contain h-10"
                                />
                                {product.price} Rs
                            </li>
                        ))
                    ) : (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
                        </div>
                    )}
                </ol>
                <div className="flex justify-center space-x-4 mt-4">
                    {currentPage > 1 && (
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                        >
                            Previous
                        </button>
                    )}
                    <span>{`Page ${currentPage} of ${totalPages}`}</span>
                    {currentPage < totalPages && (
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RsearchSort;
