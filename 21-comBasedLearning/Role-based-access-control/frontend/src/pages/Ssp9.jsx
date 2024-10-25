import React, { useEffect, useState } from "react";

const Ssp9 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await response.json();
            setProducts(responseData);
            console.log(responseData);
        };
        fetchData();
    },[]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6">
            <div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id}
                        className="border shadow-md rounded-lg flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
                        >
                            <img src={product.image} alt={product.title} 
                            className="w-full h-48 object-contain rounded m-4"
                            />
                            <h3>{product.title}</h3>
                        </div>
                    ))
                ) : (
                    <h1>No Product Found</h1>
                )}
            </div>
            <div></div>
        </div>
    );
};

export default Ssp9;
