import React, { useEffect, useState } from "react";

const SkeletonLoader = () => (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 w-1/4 rounded"></div>
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="w-full p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
        <div className="flex items-center">
            <span className="font-bold">Error:</span>
            <p className="ml-2">{message}</p>
        </div>
    </div>
);

const Ssp10 = () => {
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
                const response = await fetch(`https://fakestoreapi.com/products`);
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
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
    };

    const searchedProduct = products.filter(
        (product) =>
            product.title?.toLowerCase().includes(search.toLowerCase()) ||
            product.description?.toLowerCase().includes(search.toLowerCase()) ||
            product.price?.toString().includes(search.toLowerCase())
    );

    /*     
          const sortProduct = (productToSort) => {
              return productToSort.sort((a, b) => {
                  if (sortOrder === 'asc') {
                      return a.title.localeCompare(b.title);
                  } else {
                      return b.title.localeCompare(a.title);
                  }
              })
          }
          const sortedProduct = sortProduct([...searchedProduct]);
      */

    const sortedProduct = searchedProduct.sort((a, b) => {
        if (!a.title || !b.title) return 0;
        return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });

    const indexOfLastIndex = currentPage * itemsPerPage;
    const indexOfFirstIndex = indexOfLastIndex - itemsPerPage;
    const currentProducts = sortedProduct.slice(
        indexOfFirstIndex,
        indexOfLastIndex
    );

    const totalPage = Math.max(1, Math.ceil(sortedProduct.length / itemsPerPage));

    useEffect(() => {
        if (currentPage > totalPage) {
            setCurrentPage(totalPage);
        }
    }, [currentPage, totalPage]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-50">
            {error && <ErrorMessage message={error} />}

            <div className="w-full max-w-2xl bg-white p-4 mb-4 rounded-lg shadow-sm flex justify-between items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search Product by Title, Description or Price"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="px-2 py-2 bg-blue-500 text-white rounded-lg shadow-md transition-all hover:bg-blue-600"
                >
                    Sort {sortOrder === "asc" ? "(A-Z)" : "(Z-A)"}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl bg-white">
                {loading ? (
                    Array.from({ length: itemsPerPage }, (_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) : currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="border shadow-md rounded-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                onError={handleImageError}
                                className="w-full h-48 object-contain rounded mb-4"
                            />
                            <div>{product.title.split(" ").slice(0, 4).join(" ")}</div>
                            <div>{product.description.split(" ").slice(0, 5).join(" ")}</div>
                            <div>Rs: {product.price}</div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <h1 className="text-xl text-gray-600">No Product Found</h1>
                    </div>
                )}
            </div>

            <div className="mt-8 flex space-x-2">
                {Array.from({ length: totalPage }, (_, index) => (
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

export default Ssp10;
