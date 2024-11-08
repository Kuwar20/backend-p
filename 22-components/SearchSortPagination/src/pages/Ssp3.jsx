import React, { useEffect, useState } from 'react'

const Ssp3 = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showScrollToTop, setShowScrollToTop] = useState(false)
    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) throw new Error('Something went wrong')
                const responseData = await response.json()
                setProducts(responseData)
                setSearched(responseData) // Set searched products initially
                // If the user hasn't performed a search yet, searched will be an empty array,
                // and the product list won't display. You should show products when searched is empty.
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

    const handleSearch = () => {
        const searchedProduct = products.filter((product) =>
            product?.title.toLowerCase().includes(search.toLowerCase()) ||
            product?.description.toLowerCase().includes(search.toLowerCase()) ||
            product?.price.toString().includes(search.toLowerCase())
        )

        return setSearched(searchedProduct)
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            {error && <p className='text-red-500'>{error}</p>}

            <div className='m-2'>
                <input type="text"
                    className='p-2 m-1 border'
                    placeholder='Search by Title, Description, Price'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className='border p-2 rounded'
                    onClick={handleSearch}
                >Search</button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl'>
                {loading ?
                    <p>Loading...</p>
                    : searched.length > 0 ? (
                        searched.map((product) => (
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