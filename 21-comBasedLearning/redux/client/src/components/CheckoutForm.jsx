import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent, clearClientSecret } from '../app/slices/paymentSlice';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { clientSecret, loading } = useSelector((state) => state.payment);

    useEffect(() => {
        // Fetch payment intent when the form is mounted (or totalAmount changes)
        dispatch(createPaymentIntent(1000));  // Replace with actual amount logic
        
        // Cleanup: Clear the client secret when unmounting
        return () => {
            dispatch(clearClientSecret());
        };
    }, [dispatch]);

    const handlePayment = async (event) => {
        event.preventDefault();

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
            } else if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
            }
        } catch (error) {
            console.error('Error confirming card payment:', error);
        }
    };

    return (
        <form onSubmit={handlePayment} className="p-6 bg-white shadow rounded">
            <CardElement className="p-2 border rounded mb-4" />
            <button
                type="submit"
                disabled={!clientSecret || loading}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckoutForm;
