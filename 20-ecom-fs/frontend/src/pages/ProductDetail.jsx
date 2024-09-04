// src/pages/ProductDetail.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../app/slice/productSlice';
import { addToCart } from '../app/slice/cartSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-col md:flex-row">
                    <img src={product.image} alt={product.name} className="w-full md:w-1/2" />
                    <div className="md:ml-6">
                        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                        <p className="text-lg mb-4">{product.description}</p>
                        <p className="text-xl font-semibold mb-4">${product.price}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
