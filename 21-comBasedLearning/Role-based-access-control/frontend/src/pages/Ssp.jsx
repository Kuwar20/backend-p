import React, { useEffect, useState } from 'react'

const Ssp = () => {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`)
      const responseData = await response.json();
      setProducts(responseData)
      console.log(responseData)
    }
    fetchData()
  }, [])

  const searchedProduct = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
)

  return (
    <div className='flex flex-col min-h-screen justify-center items-center p-6'>
      <div>
        <label>Search
          <input type="text"
            placeholder='Search Product'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='m-2 p-3 border rounded'
          />
        </label>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
        {searchedProduct.length > 0 ? (
          searchedProduct.map((product) => (
            <div key={product.id}>
              <h2>{product.title} :</h2>
              <p>{product.price} Rs</p>
              <img src={product.image} alt={product.title}
                className='w-full h-48 object-contain rounded mb-4'
              />
            </div>
          ))) : (
          <p>No product Found</p>
        )}
      </div>
    </div>
  )
}

export default Ssp