import React, { useEffect } from 'react'

const Ssp9 = () => {
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const responseData = await response.json()
            console.log(responseData)
        }
        fetchData();
    })

    return (
        <div>Ssp9</div>
    )
}

export default Ssp9