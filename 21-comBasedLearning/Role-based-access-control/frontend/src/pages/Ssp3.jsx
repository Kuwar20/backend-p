import React, { useEffect, useState } from 'react'

const SkeletonLoader = () => {
    return (
        <div className="border shadow-md rounded-lg p-4 flex flex-col items-center animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 w-1/4 rounded"></div>
        </div>
    );
};

const Ssp3 = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    useEffect(() => {
        const fetchData = async () => {
            const respone = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await respone.json();
            console.log(responseData);
            setProducts(responseData);
            setLoading(false);
        }
        fetchData();
    }, []);

    const searchedProduct = products.filter((product) => (
        product.title.toLowerCase().includes(search.toLowerCase())
    ))

    const sortProduct = (productToSort) => {
        return productToSort.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        })
    }
    const sortedProduct = sortProduct([...searchedProduct]);

    const indexOfLastIndex = currentPage * itemsPerPage;
    const indexOfFirstIndex = indexOfLastIndex - itemsPerPage;
    const currentProducts = sortedProduct.slice(indexOfFirstIndex, indexOfLastIndex);

    const totalPage = Math.ceil(sortedProduct.length / itemsPerPage);

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div>
                <label>
                    Search
                    <input
                        type="text"
                        placeholder='Enter product name'
                        className='m-2 p-3 border rounded'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={() => setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))}
                    >Sort {sortOrder === 'asc' ? '↑' : '↓'}</button>
                </label>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
                {loading ? (
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) : currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div id={product.id}
                            className='border shadow-md rounded-lg p-4 flex flex-col justify-center items-center transition-transform duration-300 transform hover:scale-105'
                        >
                            <img src={product.image} alt={product.title}
                                className='w-full h-45 object-contain rounded mb-4' />
                            <h1>{product.title.split(' ').slice(0, 4).join(' ')}</h1>
                            <p>{product.description.split(' ').slice(0, 6).join(' ')}</p>
                            <p>{product.price}</p>
                        </div>
                    ))
                ) : (
                    <div>No Result Found</div>
                )}
            </div>

            <div className='mt-8'>
                {Array.from({ length: totalPage }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 p-2 border rounded
                        ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-black'
                            }`
                        }
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Ssp3