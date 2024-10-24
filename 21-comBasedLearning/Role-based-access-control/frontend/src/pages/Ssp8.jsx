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

const Ssp8 = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [sortOrder, setSortOrder] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8;
    const [showScrollToTop, setShowScrollToTop] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products`)
            const responseData = await response.json();
            console.log(responseData)
            setProducts(responseData)
            setLoading(false)
        }
        fetchData()
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

    useEffect(()=>{
        const handleScroll = ()=> {
            const scrolled= window.scrollY;
            setShowScrollToTop(scrolled > 100)
        }
        window.addEventListener('scroll', handleScroll)
        return ()=> window.removeEventListener('scroll', handleScroll)
    })

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div>
            <div>
                <input type="text"
                    placeholder='Search Product'
                    value={search}
                    className='m-2 p-3 border rounded'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >sort {sortOrder === 'asc' ? '↑' : '↓'}</button>
            <div>
                {loading ? (
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) :
                    currentProducts.length > 0 ?
                        currentProducts.map((product) => (
                            <div key={product.div}>
                                <img src={product.image} alt={product.title}
                                    className='w-48 -48 object-contain'
                                />
                                <h2>{product.title}</h2>
                                <p>{product.price}</p>
                            </div>
                        )) : (
                            <div>No Product Found</div>
                        )
                }
            </div>
            <div className='mt-4'>
                {Array.from({ length: totalPage }, (_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'bg-blue-500 text-white p-3 rounded' : 'bg-white p-3 rounded m-1 border'}
                    >{index + 1}</button>
                ))}
            </div>
            {
                showScrollToTop && (
                    <button
                        onClick={scrollToTop}
                        className='fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full h-12 w-12'
                    >Scroll To Top</button>
                )
            }
        </div>
    )
}

export default Ssp8