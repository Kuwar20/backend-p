import React, { useEffect, useState } from "react";

const Ssp9 = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await response.json();
            setProducts(responseData);
            setLoading(false);
            console.log(responseData);
        };
        fetchData();
    }, []);

    const searchedProduct = products.filter((product) => (
        product.title.toLowerCase().includes(search.toLowerCase())
    ))

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowScrollToTop(true)
            } else {
                setShowScrollToTop(false)
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    })

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6">
            <div>
                <input type="text"
                    placeholder="Search Product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="m-2 p-3 border rounded"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {loading ? (
                    <h1>Loading...</h1>
                ) :
                    searchedProduct.length > 0 ? (
                        searchedProduct.map((product) => (
                            <div key={product.id}
                                className="border shadow-md rounded-lg flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
                            >
                                <img src={product.image} alt={product.title}
                                    className="w-full h-48 object-contain rounded m-4"
                                />
                                <h3>{product.title.split(" ").slice(0, 4).join(" ")}</h3>
                                <p>${product.price}</p>
                            </div>
                        ))
                    ) : (
                        <h1>No Product Found</h1>
                    )}
            </div>
            <div></div>
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 h-12 w-12 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                    ↑
                </button>
            )}
        </div>
    );
};

export default Ssp9;
