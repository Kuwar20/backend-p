import React, { useEffect, useState } from 'react';

const SkeletonLoader = () => {
  return (
    <div className="border shadow-md rounded-lg p-4 flex flex-col items-center animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
      <div className="h-6 bg-gray-300 w-1/4 rounded"></div>
    </div>
  );
};

const SearchSortPagination = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const responseData = await response.json();
      setProducts(responseData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const searchedProduct = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortProduct = (productToSort) => {
    return productToSort.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  };

  const sortedProject = sortProduct([...searchedProduct]);

  const indexOfLastIndex = currentPage * itemsPerPage;
  const indexOfFirstIndex = indexOfLastIndex - itemsPerPage;
  const currentProducts = sortedProject.slice(
    indexOfFirstIndex,
    indexOfLastIndex
  );

  const totalPage = Math.ceil(sortedProject.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-6'>
      {/* Search and Sort Section */}
      <div className='mb-6 flex justify-center items-center'>
        <input
          type="text"
          placeholder="Enter product name"
          className="m-2 p-3 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() =>
            setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
          }
          className="ml-2 p-3 bg-blue-500 text-white rounded"
        >
          Sort {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {loading ? (
          // Show skeleton loaders while loading
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="border shadow-md rounded-lg p-4 flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain rounded mb-4"
              />
              <h3 className="text-lg font-semibold text-center">
                {product.title.split(' ').slice(0, 4).join(' ')}
              </h3>
              <p className="text-xl font-bold text-blue-500">${product.price}</p>
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="mt-8">
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 p-2 border rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`} 
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSortPagination;
