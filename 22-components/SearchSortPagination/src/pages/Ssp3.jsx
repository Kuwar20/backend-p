import React, { useEffect, useState } from 'react'

const SkeletonLoader = () => (
    <div className='border rounded shadow-md p-4 flex flex-col items-center animate-pulse'>
        <div className='w-full h-48 object-contain rounded mb-2 bg-gray-300'></div>
        <div className='w-3/4 h-6 bg-gray-300 mb-2 rounded'></div>
        <div className='w-full h-6 bg-gray-300 mb-2 rounded'></div>
        <div className='w-1/4 h-6 bg-gray-300 rounded'></div>
    </div>
)

const ErrorMessage = ({ message }) => (
    <div className="w-full p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
        <div className="flex items-center">
            <span className="font-bold">Error:</span>
            <p className="ml-2">{message}</p>
        </div>
    </div>
);

const Ssp3 = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showScrollToTop, setShowScrollToTop] = useState(false)
    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState([])
    const [searchedHistory, setSearchedHistory] = useState([])
    const [sortOrder, setSortOrder] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8;
    const [currentTime, setCurrentTime] = useState(new Date())

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
        setSearchedHistory((prevHistory) => {
            if (search.trim() === '') return prevHistory
            return [...prevHistory, search]
        })
        return setSearched(searchedProduct)
    }

    const sortedProduct = searched.sort((a, b) => {
        if (!a.title || !b.title) return;
        return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    })

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProduct.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.max(1, Math.ceil(sortedProduct.length / itemsPerPage))

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            {error && <ErrorMessage message={error} />}

            <div className='m-2'>
                {currentTime.toLocaleDateString()} : {currentTime.toLocaleTimeString()}
                <input type="text"
                    className='p-2 m-1 border'
                    placeholder='Search by Title, Description, Price'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                    className='border p-2 rounded'
                    onClick={handleSearch}
                >Search
                </button>

                <button
                    className='border p-2 rounded'
                    onClick={() => setSortOrder((prevOrder) => prevOrder === 'asc' ? "desc" : "asc")}
                >Sort{sortOrder === 'asc' ? " (A-Z)" : " (Z-A)"}
                </button>

                <div>
                    {searchedHistory.map((history, index) => (
                        <li key={index} className='flex items-center justify-between m-1 p-1 bg-gray-200 rounded'>{index}: {history}
                            <button
                                onClick={() => setSearchedHistory((prevHistory) => prevHistory.filter((_, i) => i !== index))}
                            >x</button>
                        </li>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
                {loading ? (
                    Array.from({ length: itemsPerPage }, (_, index) => (
                        <SkeletonLoader key={index} />
                    )))
                    : currentItems.length > 0 ? (
                        currentItems.map((product) => (
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

            <div className='mt-2'>
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`border rounded px-3 py-1 font-medium mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}
                            transition-colors hover:bg-blue-400 hover:text-white`}
                        >{index + 1}</button>
                    ))}
            </div>
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