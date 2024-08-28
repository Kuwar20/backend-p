// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../store/slices/productsSlice";
// import ProductCard from "./ProductCard";

// const HomePage = () => {
//     const dispatch = useDispatch();
//     const { products, status } = useSelector((state) => state.products);

//     useEffect(() => {
//         if (status === "idle") {
//             dispatch(fetchProducts());
//         }
//     }, [status, dispatch]);

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">Products</h2>
//             {status === "loading" && <p>Loading...</p>}
//             {status === "failed" && <p>Failed to load products.</p>}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomePage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";
import ProductCard from "./ProductCard";

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Our Products</h2>

            {status === "loading" && (
                <div className="flex justify-center items-center">
                    <p className="text-lg text-blue-600">Loading products, please wait...</p>
                </div>
            )}
            {status === "failed" && (
                <div className="flex justify-center items-center">
                    <p className="text-lg text-red-600">Failed to load products. Please try again later.</p>
                </div>
            )}

            {status === "succeeded" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {status === "succeeded" && products.length === 0 && (
                <div className="flex justify-center items-center">
                    <p className="text-lg text-gray-600">No products available at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;
