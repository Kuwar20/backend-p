import React, { useEffect, useState } from "react";

const RsearchSort2 = () => {

    // const initialProducts = Array.from({ length: 50 }, (_, index) => ({
    //     id: index + 1,
    //     title: `Product ${index + 1}`,
    //     price: (index + 1) * 10, // Example price
    //     image: "https://via.placeholder.com/150", // Placeholder image
    // }));

    // State to hold the list of products
    const [products, setProducts] = useState([]);
    // State to hold the current search input
    const [search, setSearch] = useState("");
    // State to manage the sorting order (ascending or descending)
    const [sortOrder, setSortOrder] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // useEffect hook to fetch products from the API
    // This effect runs once when the component mounts (empty dependency array)
    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from the fake store API
            const response = await fetch(`https://fakestoreapi.com/products/`);
            //const response = await fetch(`http://localhost:5000/api/products`);
            const data = await response.json(); // Convert the response to JSON
            setProducts(data); // Update state with the fetched products
            console.log(data); // Log the fetched data for debugging
        };
        fetchData(); // Call the function to fetch data
    }, []); // Empty dependency array ensures this runs only once

    // Filter products based on the search input
    const searchedProduct = products.filter(
        (product) => product.title.toLowerCase().includes(search.toLowerCase()) // Check if the product title includes the search term
    );

    // Function to sort products based on the current sort order
    const sortProducts = (productsToSort) => {
        return productsToSort.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title); // Sort in ascending order by title
            } else {
                return b.title.localeCompare(a.title); // Sort in descending order by title
            }
        });
    };

    // Store the sorted products after filtering them based on the search term
    const sortedProducts = sortProducts([...searchedProduct]); // Use the spread operator to create a copy of the filtered products

    // pagination
    const indexOfLastProduct = currentPage * itemsPerPage; // Get the last index of the current page
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage; // Get the first index of the current page
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct); // Get the products for the current page

    // Calculate total pages
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage); // Total number of pages

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Update the current page
    };


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5">
            <div className="mb-4 w-full max-w-md">
                <label className="block text-lg font-medium mb-2">
                    Search:
                    <input
                        type="text"
                        value={search} // Controlled input for search
                        onChange={(e) => setSearch(e.target.value)} // Update search state on input change
                        placeholder="Search Products"
                        className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>
                <button
                    onClick={() =>
                        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
                    }
                >
                    Sort {sortOrder === "asc" ? "↑" : "↓"}
                </button>{" "}
                {/* Display current sort order */}
            </div>
            <div className="w-full max-w-md">
                <ol className="list-decimal space-y-2">
                    {currentProducts.length > 0 ? (
                        // Map over sorted products and render them
                        currentProducts.map((product) => (
                            <li
                                key={product.id}
                                className="flex items-center bg-white p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-16 h-16 object-contain mr-4"
                                />
                                <div>
                                    <h2 className="font-semibold">{product.title}</h2>
                                    <p className="text-gray-600">{product.price} Rs</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        // Show loading animation if no products found
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </ol>
            </div>
            <div className="mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)} // Change page when clicked
                        className={`mx-1 p-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} // Style the active page button
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RsearchSort2;
