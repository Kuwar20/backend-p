// src/pages/Checkout.js

import React from 'react';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const { cartItems } = useSelector((state) => state.cart);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePayment = () => {
        // Handle payment process (e.g., Stripe, PayPal)
        alert('Payment successful');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item._id} className="mb-2">
                            {item.quantity} x {item.name} - ${item.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <div className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</div>
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handlePayment}
            >
                Pay Now
            </button>
        </div>
    );
};

export default Checkout;
