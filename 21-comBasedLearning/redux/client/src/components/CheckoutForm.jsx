import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent, clearClientSecret } from '../app/slices/paymentSlice';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { clientSecret, loading } = useSelector((state) => state.payment);
    const [paymentMessage, setPaymentMessage] = useState('');

    useEffect(() => {
        // Create a payment intent when the component mounts
        dispatch(createPaymentIntent(1000)); // Replace with your actual amount
        
        // Clear the client secret when the component unmounts
        return () => {
            dispatch(clearClientSecret());
        };
    }, [dispatch]);

    console.log('Client Secret:', clientSecret);

    const handlePayment = async (event) => {
        event.preventDefault();
        setPaymentMessage(''); // Clear previous messages

        if (!stripe || !elements || !clientSecret) {
            console.error('Stripe.js or Elements not loaded, or clientSecret is missing.');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (result.error) {
                console.error('Payment error:', result.error.message);
                setPaymentMessage(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
                setPaymentMessage('Payment successful!');
            }
        } catch (error) {
            console.error('Error confirming card payment:', error);
            setPaymentMessage('Payment failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handlePayment} className="p-6 bg-white shadow rounded max-w-md mx-auto">
            <CardElement className="p-2 border rounded mb-4" />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                disabled={!clientSecret || loading}
            >
                {loading ? 'Processing...' : 'Pay'}
            </button>
            {paymentMessage && (
                <div className={`mt-4 text-center ${paymentMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                    {paymentMessage}
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;
