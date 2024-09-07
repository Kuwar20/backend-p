import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// import { config } from 'dotenv'; // or this, both works
// config();

// Initialize Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Connect to MongoDB
connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

// Define order schema and model
const orderSchema = new Schema({
    items: [{ name: String, price: Number }],
    totalAmount: Number,
    paymentIntentId: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = model('Order', orderSchema);

// Initialize express app

// Route to handle payment intent creation
app.post('/api/payment/create-payment-intent', async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
        });
        console.log('paymentIntent:', paymentIntent);
        // Save order to the database
        const order = new Order({
            items,
            totalAmount,
            paymentIntentId: paymentIntent.id,
        });

        await order.save();

        // Send clientSecret to the frontend
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
