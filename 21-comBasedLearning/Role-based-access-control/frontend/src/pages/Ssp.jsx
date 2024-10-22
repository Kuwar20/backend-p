import React, { useEffect, useState } from 'react'

const SkeletonLoader = () => {
  return (
    <div className='border shadow-md rounded-lg flex flex-col items-center p-4 animate-pulse'>
      {/* Mimics the product image */}
      <div className='w-full h-48 bg-gray-300 rounded mb-4'></div>
      {/* Mimics the product title */}
      <div className='h-6 bg-gray-300 w-3/4 rounded mb-2'></div>
      {/* Mimics the product price */}
      <div className='h-6 bg-gray-300 w-1/4 rounded'></div>
    </div>
  )
}

const Ssp = () => {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`)
      const responseData = await response.json();
      setProducts(responseData)
      setLoading(false)
      console.log(responseData)
    }
    fetchData()
  }, [])

  const searchedProduct = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  const sortProduct = (productToSort) => {
    return productToSort.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title)
      } else {
        return b.title.localeCompare(a.title)
      }
    })
  }

  const sortedProduct = sortProduct([...searchedProduct])

  const indexOfLastIndex = currentPage * itemsPerPage;
  const indexOfFirstIndex = indexOfLastIndex - itemsPerPage;
  const currentProducts = sortedProduct.slice(indexOfFirstIndex, indexOfLastIndex);

  const totalPage = Math.ceil(sortedProduct.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  return (
    <div className='flex flex-col min-h-screen justify-center items-center p-6'>
      <div className='mb-6 flex justify-center items-center'>
        <label>Search
          <input type="text"
            placeholder='Search Product'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='m-2 p-3 border rounded'
          />
          <button
            onClick={() => setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))}
            className='p-3 bg-blue-500 text-white rounded'
          > Sort {sortOrder === 'asc' ? '↑' : '↓'}</button>
        </label>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl'>

        {
          loading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
              currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <div key={product.id}
                    className='border shadow-md rounded-lg flex flex-col items-center transition-transform duration-300 transform hover:scale-105'
                  >
                    <img src={product.image} alt={product.title}
                      className='w-full h-48 object-contain rounded mb-4'
                    />
                    <h2>{product.title.split(' ').slice(0, 4).join(' ')}</h2>
                    <p className="text-xl font-bold text-blue-500">${product.price}</p>
                  </div>
                ))) : (
                <p>No product Found</p>
              )
          )
        }
      </div>

      <div>
        {Array.from({ length: totalPage }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`m-2 p-3 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {index + 1}
          </button>
        ))
        }
      </div>
    </div>
  )
}

export default Ssp