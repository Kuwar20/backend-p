import React, { useEffect, useState } from 'react'

const Ssp2 = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await response.json();
            setProducts(responseData);
            console.log(responseData)
        }
        fetchData();
    }, [])

    const searchedProduct = products.filter((product) => (
        product.title.toLowerCase().includes(search.toLowerCase())
    ))

    const sortProduct = (productToSort) => {
        return productToSort.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title)
            } else {
                return b.title.localeCompare(a.title)
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

            {/* search  */}
            <div>
                <label>Search</label>
                <input type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Enter product name'
                    className='m-2 p-3 border rounded'
                />
                <button onClick={() => setSortOrder((prevOrder) => prevOrder === 'asc' ? 'desc' : 'asc')}>Sort {sortOrder === 'asc' ? '↑' : '↓'}</button>
            </div>

            {/* product  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl'>
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div key={product.id} className='m-2 p-3 border rounded'>
                            <h1>{product.title}</h1>
                            <p>{product.description}</p>
                        </div>
                    ))) : (
                    <h1>No Product found...</h1>
                )}
            </div>
            {/* pagination  */}
            <div>
                {Array.from({ length: totalPage }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`mx-1 p-2 border rounded ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-black'
                            }`}
                        onClick={() => setCurrentPage(index + 1)}
                    >{index + 1}</button>
                ))
                }
            </div>
        </div>
    )
}

export default Ssp2