import React, { useEffect, useState } from 'react';

const RsearchSort2 = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/`);
            const data = await response.json();
            setProducts(data);
            console.log(data);
        };
        fetchData();
    }, []);

    const searchProduct = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100 p-5'>
            <div className='mb-4 w-full max-w-md'>
                <label className='block text-lg font-medium mb-2'>
                    Search:
                    <input 
                        type="text"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder='Search Products'
                        className='mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </label>
            </div>
            <div className='w-full max-w-md'>
                <ol className='list-decimal space-y-2'>
                    {searchProduct.length > 0 ? (
                        searchProduct.map((product) => (
                            <li key={product.id} className='flex items-center bg-white p-4 border rounded-lg shadow hover:shadow-md transition-shadow'>
                                <img 
                                    src={product.image} 
                                    alt={product.title}
                                    className='w-16 h-16 object-contain mr-4' 
                                />
                                <div>
                                    <h2 className='font-semibold'>{product.title}</h2>
                                    <p className='text-gray-600'>{product.price} Rs</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="flex items-center justify-center space-x-2">
                            <div className='w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin'></div>
                        </div>
                    )}
                </ol>
            </div>
        </div>
    );
};

export default RsearchSort2;
