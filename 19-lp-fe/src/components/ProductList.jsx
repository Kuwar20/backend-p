import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../app/slices/productsSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const productStatus = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    let content;

    if (productStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (productStatus === 'succeeded') {
        content = products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded p-4">
                <img src={product.image} alt={product.title} className="h-40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-500">${product.price}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                    Add to Cart
                </button>
            </div>
        ));
    } else if (productStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {content}
        </div>
    );
};

export default ProductList;
