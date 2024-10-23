import React, { useEffect, useState } from 'react'

const SkeletonLoader = () => {
    return (
        <div className='border rounded-lg shadow-md p-4 flex flex-col items-center animate-pulse'>
            <div className='w-full h-48 bg-gray-300 rounded mb-4'></div>
            <div className='h-6 bg-gray-300 w-3/4 rounded mb-2'></div>
            <div className='h-6 bg-gray-300 w-1/4 rounded'></div>
        </div>
    )
}

const Ssp6 = () => {

    const [products, setProducts] = useState([]); 4
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const responseData = await response.json();
            setProducts(responseData);
            setLoading(false);
            console.log(responseData);
        }
        fetchData();
    }, [])

    const searchedProduct = products.filter((product) => (
        product.title.toLowerCase().includes(search.toLowerCase())
    ))

    const sortProduct = (productToSort) => {
        return productToSort.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            }
            else {
                return b.title.localeCompare(a.title);
            }
        })
    }

    const sortedProduct = sortProduct([...searchedProduct]);

    const indexOfLastIndex = currentPage * itemsPerPage;
    const indexOfFirstIndex = indexOfLastIndex - itemsPerPage;
    const currentProducts = sortedProduct.slice(indexOfFirstIndex, indexOfLastIndex);

    const totalPage = Math.ceil(sortedProduct.length / itemsPerPage);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            if (scrolled > 100) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
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
        <div className='flex flex-col justify-center items-center min-h-screen p-6'>
            <div className='mb-6 flex justify-center items-center'>
                <label>
                    <input type="text"
                        placeholder='Search Products...'
                        className='border p-2 rounded-lg w-full'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >Sort {sortOrder === 'asc' ? '↑' : '↓'}</button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
                {loading ? (
                    Array.from({ length: itemsPerPage }, (_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) :
                    currentProducts.length > 0 ? (
                        currentProducts.map((product) => {
                            <div key={product.id}
                                className='border shadow-md rounded-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 cursor-pointer'
                            >
                                <img src={product.image} alt={product.title}
                                    className='h-48 w-48 object-contain rounded mb-4'
                                />
                                <h1>{product.title.split(" ").slice(0, 4).join(" ")}</h1>
                                <h2>{product.price}</h2>
                            </div>
                        })
                    ) : (
                        <div>No Product Found...</div>
                    )
                }
            </div>
            <div className='mt-4'>
                {
                    Array.from({ length: totalPage }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`border p-2 m-1 ${currentPage === index + 1
                                ? 'bg-gray-500 text-white'
                                : 'bg-white'}`}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>
            {
                showScrollToTop && (
                    <button
                        onClick={scrollToTop}
                        className='fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full w-12 h-12'
                    >
                        ↑
                    </button>
                )
            }
        </div>
    )
}

export default Ssp6