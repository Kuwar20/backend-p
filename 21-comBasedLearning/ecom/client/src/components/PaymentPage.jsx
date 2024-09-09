import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(50); // Set minimum to 50 cents (50 in Stripe format)
  const [error, setError] = useState(null);
  const { total } = useSelector((state) => state.cart);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    if (amount < 50) { // Stripe's minimum for USD is usually 50 cents
      setError("Amount must be at least $0.50.");
      return;
    }

    try {
      // Call your backend to create a PaymentIntent
      const { data } = await axios.post('http://localhost:5000/create-payment-intent', {
        amount: total,
        userId: 'your_user_id', // Replace with the actual user ID
        products: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
      });

      const clientSecret = data.clientSecret;

      // Confirm the card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          value={total}
          min={50} // Ensure minimum value is 50 (50 cents)
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>
      <CardElement className="mb-4 border border-gray-300 p-2 rounded" />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;