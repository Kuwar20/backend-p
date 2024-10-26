import React, { useEffect, useState } from 'react'

const Ssp10 = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`)
            const responseData = await response.json()
            setProducts(responseData);
            console.log(responseData)
        }
        fetchData()
    }, [])

    return (
        <div className='flex flex-col justify-center items-center min-h-screen p-6 bg-gray-50'>
            <div></div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl bg-white'>
                {
                    products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id}
                                className='border shadow-md rounded-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105'
                            >
                                <img src={product.image} alt={product.title}
                                    className='w-full h-48 object-contain rounded mb-4'
                                />
                                <div>{product.title.split(" ").slice(0, 4).join(" ")}</div>
                                <div>{product.description.split(" ").slice(0, 5).join(" ")}</div>
                                <div>Rs: {product.price}</div>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-full text-center py-8'>
                            <h1 className='text-xl text-gray-600'>No Product Found</h1>
                        </div>
                    )
                }
            </div>
            <div></div>
        </div>
    )
}

export default Ssp10