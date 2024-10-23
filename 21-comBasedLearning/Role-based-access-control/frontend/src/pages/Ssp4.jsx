import React, { useEffect, useState } from 'react'

const Ssp4 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await response.json();
            setProducts(responseData);
        }
        fetchData();
    })

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-6'>
            
            <div></div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id}>
                            <img src={product.image} alt={product.title} 
                            className='w-full h-48 object-contain rounded mb-4'
                            />
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                        </div>
                    ))
                ) : (
                    <div>
                        <h3>No Products Found</h3>
                    </div>
                )}
            </div>

            <div></div>
        </div>
    )
}

export default Ssp4