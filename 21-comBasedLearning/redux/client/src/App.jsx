import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { addItem } from './app/slices/cartSlice';
import { createPaymentIntent } from './app/slices/paymentSlice';
import CheckoutForm from './components/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const App = () => {
    const dispatch = useDispatch();
    const { totalAmount } = useSelector((state) => state.cart);

    useEffect(() => {
        if (totalAmount > 0) {
            dispatch(createPaymentIntent(totalAmount * 100)); // Amount in cents for Stripe
        }
    }, [totalAmount, dispatch]);

    const handleAddItem = () => {
        dispatch(addItem({ name: 'Product 1', price: 20 }));
    };

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-2xl mb-4">Shopping Cart</h1>
            <button onClick={handleAddItem} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Add Item
            </button>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default App;
