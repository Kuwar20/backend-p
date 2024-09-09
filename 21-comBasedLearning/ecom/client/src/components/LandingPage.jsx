import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../app/slices/productSlice';
import ProductSkeleton from './ProductSkeleton';

const LandingPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(10).fill(0).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="p-4 border rounded">
              <img src={product.image} alt={product.title} className="h-40 w-full object-cover" />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p>{product.price} USD</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
