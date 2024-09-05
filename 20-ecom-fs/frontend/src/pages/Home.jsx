import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../app/slice/productSlice';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Skeleton loader component for loading state
    const LoadingSkeleton = () => (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col h-full animate-pulse">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="h-6 bg-gray-200 mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 mb-2 rounded"></div>
                <div className="h-6 bg-gray-200 mt-auto rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <Navbar />
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Render 8 skeletons as placeholders */}
                    {Array(8).fill(0).map((_, index) => (
                        <LoadingSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
