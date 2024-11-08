import React, { useEffect, useState } from 'react'

const Ssp3 = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showScrollToTop, setShowScrollToTop] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch('https://fakestoreapi.com/products')
                if (!respone.ok) throw new Error('Something went wrong')
                const responseData = await respone.json()
                setProducts(responseData)
                setError(null)
                console.log("Response Data: ", responseData)
                console.log("Products: ", products)
            } catch (error) {
                setError(error.message || "Failed to fetch products")
                setProducts([])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            {error && <p className='text-red-500'>{error}</p>}

            <div></div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl'>
                {loading ?
                    <p>Loading...</p>
                    : products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id}
                                className='border shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105'
                            >
                                <img src={product.image} alt={product.title}
                                    onError={handleImageError}
                                    className='w-full h-48 object-contain rounded mb-4'
                                />
                                <p>{product.title.split(" ").slice(0, 4).join(" ")}</p>
                                <p>{product.description.split(" ").slice(0, 5).join(" ")}</p>
                                <p>{product.price}</p>
                            </div>
                        ))) : (
                        <p>No products found...</p>
                    )}
            </div>
            <div></div>
            {
                showScrollToTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-10 right-10 h-12 w-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all"
                    >
                        ↑
                    </button>
                )
            }
        </div>
    )
}

export default Ssp3