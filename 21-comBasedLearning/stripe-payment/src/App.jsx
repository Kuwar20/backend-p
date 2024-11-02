import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    .then((stripe) => {
        console.log("Stripe loaded successfully");
        return stripe;
    })
    .catch((error) => {
        console.error("Failed to load Stripe:", error);
    });

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { data: clientSecret } = await axios.post('http://localhost:4000/create-payment-intent', {
            amount: 6000, // Amount in cents (e.g., 50 USD)
        });

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            setPaymentMessage(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                setPaymentMessage('Payment successful!');
            }
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Payment Form</h2>
            <CardElement className="border p-2 rounded-md" />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
                {loading ? 'Processing...' : 'Pay $60'}
            </button>
            {paymentMessage && (
                <div className="mt-4 text-center text-red-500">
                    {paymentMessage}
                </div>
            )}
        </form>
    );
};

const App = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default App;
