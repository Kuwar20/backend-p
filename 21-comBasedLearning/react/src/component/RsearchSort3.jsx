import React, { useEffect, useState } from 'react'

const RsearchSort3 = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await response.json();
            setProducts(responseData);
            console.log(responseData);
        };

        fetchData();
    }, []);

    const handleSearch = products.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div>
            <div>
                Search:
                <input
                    type="text"
                    placeholder="enter product name"
                    className="m-2 p-3 border rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <h1>
                {handleSearch.length > 0 ? (
                    handleSearch.map((product) => (
                        <li key={product.id}>
                            {product.title} : {product.price}
                        </li>
                    ))
                ) : (
                    <div>Loading</div>
                )}
            </h1>
        </div>
    );
};

export default RsearchSort3