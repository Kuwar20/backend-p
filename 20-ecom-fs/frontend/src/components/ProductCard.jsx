import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="group bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
            <Link to={`/product/${product.id}`} className="flex flex-col h-full">
                <div className="relative h-64 flex items-center justify-center overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.isNew && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                            New
                        </span>
                    )}
                    {product.isOnSale && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                            Sale
                        </span>
                    )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                        {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{product.description}</p>
                    <div className="flex items-center mb-2">
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                        star <= (product.rating?.rate || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-600">
                            {product.rating
                                ? `${product.rating.rate.toFixed(1)} (${product.rating.count})`
                                : 'No ratings'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                        <div className="text-xl font-bold text-blue-600">
                            ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                        </div>
                        <button className="flex items-center text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors duration-300">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;