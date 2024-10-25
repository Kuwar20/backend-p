import React, { useEffect, useState } from "react";

const SkeletonLoader = () => (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 w-1/4 rounded"></div>
    </div>
);

const Ssp9 = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await response.json();
            setProducts(responseData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const searchedProduct = products.filter(
        (product) =>
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()) ||
            product.price.toString().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const sortProduct = (productToSort) =>
        productToSort.sort((a, b) =>
            sortOrder === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
        );

    const sortedProduct = sortProduct([...searchedProduct]);

    const indexOfLastIndex = currentPage * itemsPerPage;
    const indexOfFirstIndex = indexOfLastIndex - itemsPerPage;
    const currentProducts = sortedProduct.slice(
        indexOfFirstIndex,
        indexOfLastIndex
    );

    const totalPage = Math.ceil(sortedProduct.length / itemsPerPage);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-50">
            {/* Search and Sort Section */}
            <div className="w-full max-w-2xl bg-white p-4 mb-4 rounded-lg shadow-md flex justify-between items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search Product with title, description, or price"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-grow p-2 border rounded focus:outline-none"
                />
                <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-all hover:bg-blue-600"
                >
                    Sort {sortOrder === "asc" ? "↑" : "↓"}
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {loading ? (
                    Array.from({ length: itemsPerPage }, (_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) : currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="border shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform duration-300 transform hover:scale-105 bg-white"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-contain rounded mb-4"
                            />
                            <h3 className="font-semibold text-gray-800 text-center text-lg mb-2">
                                {product.title.split(" ").slice(0, 4).join(" ")}
                            </h3>
                            <h4>{product.description.split(" ").slice(0,5).join(" ")}</h4>
                            <p className="text-gray-600 font-medium">${product.price}</p>
                        </div>
                    ))
                ) : (
                    <h1>No Product Found</h1>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex space-x-2">
                {Array.from({ length: totalPage }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`border rounded px-3 py-1 font-medium ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            } transition-colors hover:bg-blue-400 hover:text-white`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Scroll to Top Button */}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 h-12 w-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all"
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default Ssp9;
