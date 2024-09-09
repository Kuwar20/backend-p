import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse p-4 border rounded">
      <div className="h-40 bg-gray-300 rounded"></div>  {/* Image */}
      <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>  {/* Title */}
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/4"></div>  {/* Price */}
    </div>
  );
};

export default ProductSkeleton;
