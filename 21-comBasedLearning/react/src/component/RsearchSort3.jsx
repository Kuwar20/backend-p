import React, { useEffect, useState } from "react";

const RsearchSort3 = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await response.json();
            setProducts(responseData);
            console.log(responseData);
        };

        fetchData();
    }, []);

    const searchedProduct = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const sortProducts = (productToSort) => {
        return productToSort.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
    };

    const sortedProducts = sortProducts([...searchedProduct]);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="block">
                Search:
                <input
                    type="text"
                    placeholder="enter product name"
                    className="m-2 p-3 border rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={() =>
                        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
                    }
                >
                    Sort {sortOrder === "asc" ? "↑" : "↓"}
                </button>
            </div>

            <div className="block">
                <ol className="list-decimal">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <li key={product.id}>
                                {product.title} : {product.price}
                            </li>
                        ))
                    ) : (
                        <div>Loading</div>
                    )}
                </ol>
            </div>
            <div className="mt-4">
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 p-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} // Style the active page button
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default RsearchSort3;
