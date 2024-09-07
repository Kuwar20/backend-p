import React from 'react';
import { useSelector } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { clientSecret, loading } = useSelector((state) => state.payment);

    console.log('Client Secret:', clientSecret); // Add this line

    const handlePayment = async (event) => {
        event.preventDefault();
        console.log('Handle Payment Called');  // Debugging line

        console.log('Stripe:', stripe);
        console.log('Elements:', elements);
        console.log('Client Secret:', clientSecret);
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
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckoutForm;


