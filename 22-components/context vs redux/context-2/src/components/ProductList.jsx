// src/components/ProductList.jsx
import { useContext } from 'react';
// import { useCart } from '../context/CartContext';
import {CartContext} from '../context/CartContext'

const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Headphones', price: 99 },
    { id: 3, name: 'Mouse', price: 29 },
];

const ProductList = () => {
    // const { addToCart } = useCart();
    const { addToCart } = useContext(CartContext)

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-4 rounded">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;