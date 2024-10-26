import React, { useEffect, useState } from 'react'

const Ssp10 = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showScrollToTop, setScrollToTop] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json()
                setProducts(responseData);
                setError(null);
                console.log(responseData)
            } catch (error) {
                setError(error.message || 'Failed to fetch products')
                setProducts([])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollToTop(window.scrollY > 100);
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className='flex flex-col justify-center items-center min-h-screen p-6 bg-gray-50'>
            {error && <div className='text-red-500'>{error}</div>}
            <div></div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl bg-white'>
                {loading ? (
                    <div>Loading...</div>
                ) :
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
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className='fixed bottom-10 right-10 h-12 w-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all'>
                    ↑
                </button>
            )}
        </div>
    )
}

export default Ssp10