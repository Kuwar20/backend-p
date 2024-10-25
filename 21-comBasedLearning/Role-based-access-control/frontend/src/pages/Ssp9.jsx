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
        <div>
            <div></div>
            <div>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id}>
                            <img src={product.image} alt={product.title} />
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
