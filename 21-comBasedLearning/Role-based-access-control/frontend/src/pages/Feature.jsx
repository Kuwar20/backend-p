import React, { useEffect, useState } from 'react'

const Feature = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/category/jewelery`)
            const responseData = await response.json();
            setProducts(responseData);
            setLoading(false);
            console.log(responseData)
        }
        fetchData()
    }, [])

    const searchProduct = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()) || product.price.toString().includes(search.toLowerCase())
    )

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            setShowScrollToTop(scrolled > 100);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    })

    const scrollToTop = ()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-6'>

            <div className='w-full max-w-2xl bg-white p-4 mb-4 rounded-lg shadow-md flex justify-between items-center space-x-4'>
                <input type='text' placeholder='Search product using title description or price' value={search} onChange={(e) => setSearch(e.target.value)}
                    className='flex-grow p-2 border rounded focus:outline-none'
                />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
                {loading ? (
                    Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className='border rounded-lg shadow-md p-4 flex flex-col items-center animate-pulse'>
                            <div className='w-full h-48 bg-gray-300 rounded mb-4'></div>
                            <div className='h-6 bg-gray-300 w-3/4 rounded mb-2'></div>
                            <div className='h-6 bg-gray-300 w-1/4 rounded'></div>
                        </div>))
                ) :
                    searchProduct.length > 0 ? (
                        searchProduct.map((product) => (
                            <div key={product.id}
                                className='border rounded-lg shadow-md p-4 flex flex-col items-center transition-transform duration-300 transform hover:scale-105'
                            >
                                <img src={product.image} alt={product.title}
                                    className='w-full h-48 object-contain rounded mb-4'
                                />
                                <h1>{product.title}</h1>
                                <h2>{product.description.split(" ").slice(0, 5).join(" ")}</h2>
                                <h3>{product.price}</h3>
                            </div>
                        )
                        )) : (
                        <div>No Products found</div>
                    )
                }
            </div>
            {
                showScrollToTop && (
                    <button
                    onClick={scrollToTop}
                    className='fixed h-12 w-12 bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full'
                    >
                        /\
                    </button>
                )
            }
        </div>
    )
}

export default Feature