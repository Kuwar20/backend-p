import React, { useEffect, useState } from 'react'

const Ssp = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`)
      const responseData = await response.json();
      setProducts(responseData)
      console.log(responseData)
    }
    fetchData()
  }, [])

  return (
    <div className='flex flex-col min-h-screen justify-center items-center p-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
        {products.length > 0 ? (
          products.map((product) => (
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