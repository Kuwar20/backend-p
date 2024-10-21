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
    <div>
      <div>
        <ol className='list-decimal'>
          { products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))):(
            <p>No product Found</p>
          )}
        </ol>
      </div>
    </div>
  )
}

export default Ssp