import React, { useEffect, useState } from "react";

const ErrorMessage = ({ message }) => (
    <div className="w-full p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
        <div className="flex items-center">
            <span className="font-bold">Error:</span>
            <p className="ml-2">{message}</p>
        </div>
    </div>
);

const SkeletonLoader = () => (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 w-1/4 rounded"></div>
    </div>
);

const Ssp2 = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showScrollToTop, setScrollToTop] = useState(false);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();
                setProducts(responseData);
                setError(null);
                console.log(responseData);
            } catch (error) {
                setError(error.message || "Failed to fetch products");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollToTop(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const searchedProducts = products.filter(
        (product) =>
            product.title?.toLowerCase().includes(search.toLowerCase()) ||
            product.description?.toLowerCase().includes(search.toLowerCase()) ||
            product.price?.toString().includes(search.toLowerCase())
    );

    const sortedProducts = searchedProducts.sort((a, b) => {
        if (!a.title || !b.title) return 0;
        return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    })

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {error && <ErrorMessage message={error} />}
            <div className=''>
                <input
                    type="text"
                    placeholder="Search Products by Title, Description, Price"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="p-2 mb-4 bg-blue-500 text-white rounded"
                >
                    Sort {sortOrder === "asc" ? "(A-Z)" : "(Z-A)"}
                </button>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full max-w-6xl">
                {loading ? (
                    Array.from({length:itemsPerPage},(_,index)=>(
                        <SkeletonLoader key={index} />
                    ))
                ) : currentItems.length > 0 ? (
                    currentItems.map((product) => (
                        <div key={product.id}
                            className="border shadow-md rounded-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-contain rounded mb-4"
                            />
                            <h3>{product.title.split(" ").slice(0, 5).join(" ")}</h3>
                            <p>{product.description.split(" ").slice(0, 5).join(" ")}</p>
                            <p>{product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No Product Found</p>
                )}
            </div>

            <div className="mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`border rounded px-3 py-1 font-medium ${currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }transition-colors hover:bg-blue-400 hover:text-white`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

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

export default Ssp2;
