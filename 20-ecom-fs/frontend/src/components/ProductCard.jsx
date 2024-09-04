// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden bg-white">
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
