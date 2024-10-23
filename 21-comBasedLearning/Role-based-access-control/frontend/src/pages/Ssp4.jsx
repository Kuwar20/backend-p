import React, { useEffect, useState } from 'react'

const Ssp4 = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await response.json();
            setProducts(responseData);
            setLoading(false);
        }
        fetchData();
    })

    const searchedProduct = products.filter((product) => (
        product.title.toLowerCase().includes(search.toLowerCase())
    ))

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            setShowScrollTop(scrolled > 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const sortProduct = (productToSort) => {
        return productToSort.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
    }
    const sortedProduct = sortProduct([...searchedProduct]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-6'>

            <div>
                <label>
                    Search:
                    <input type="text"
                        placeholder='Search Products'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='border p-3 m-2 rounded'
                    />
                </label>
                <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >Sort{sortOrder === 'asc' ? '↑' : '↓'}</button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
                {loading ? (
                    <h3>Loading...</h3>
                ) :
                sortedProduct.length > 0 ? (
                    sortedProduct.map((product) => (
                        <div key={product.id}
                            className='border rounded-lg shadow-md p-4 flex flex-col items-center transition-transform duration-300 transform hover:scale-105'
                        >
                            <img src={product.image} alt={product.title}
                                className='w-full h-48 object-contain rounded mb-4'
                            />
                            <h2>{product.title.split(" ").slice(0, 4).join(" ")}</h2>
                            <p>{product.description.split(" ").slice(0, 5).join(" ")}</p>
                        </div>
                    ))
                ) : (
                    <div>
                        <h3>No Products Found</h3>
                    </div>
                )}
            </div>

            <div></div>
            {
                showScrollTop && (
                    <button
                    onClick={scrollToTop}
                    className='fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full'
                    >
                            ↑
                    </button>
                )
            }
        </div>
    )
}

export default Ssp4