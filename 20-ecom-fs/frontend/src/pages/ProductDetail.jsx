import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../app/slice/productSlice';
import { addToCart } from '../app/slice/cartSlice';
import { Star, ShoppingCart, Heart, TruckIcon } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.products);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ ...product, quantity }));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!product) {
        return <div className="text-center py-10">Product not found</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row md:h-[600px]"> {/* Set a fixed height for desktop */}
                    <div className="md:w-1/2 h-full">
                        <div className="h-full flex items-center justify-center">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="max-w-full max-h-full object-contain p-4"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h2>
                        <div className="flex items-center mb-4">
                            <div className="flex items-center mr-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-5 h-5 ${
                                            star <= (product.rating?.rate || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating ? `${product.rating.rate.toFixed(1)} (${product.rating.count} reviews)` : 'No ratings yet'}
                            </span>
                        </div>
                        <p className="text-xl font-bold mb-4 text-blue-600">
                            ${typeof product.price === 'number' ? product.price.toFixed(2) : 'Price not available'}
                        </p>
                        <p className="text-gray-600 mb-6 flex-grow overflow-y-auto">{product.description}</p>
                        <div className="mt-auto">
                            <div className="flex items-center mb-6">
                                <label htmlFor="quantity" className="mr-4 text-gray-700">Quantity:</label>
                                <select
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="border rounded px-2 py-1 text-gray-700"
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex space-x-4 mb-6">
                                <button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-300">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex items-center text-green-600 mb-2">
                                    <TruckIcon className="w-5 h-5 mr-2" />
                                    <span>Free shipping on orders over $50</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    30-day return policy. Satisfaction guaranteed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;