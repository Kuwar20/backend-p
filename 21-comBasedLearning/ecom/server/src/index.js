import express, { json } from 'express';
import dotenv from "dotenv";
import Stripe from "stripe";
import mongoose from 'mongoose';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const PORT = process.env.PORT || 5001;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Database connection
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{ productId: String, quantity: Number }],
    amount: { type: Number, required: true },
    paymentIntentId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Rate limiter middleware: Limit to 3 requests per hour
const paymentIntentLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,  // 1 hour window
    max: 3,                    // Max 3 requests per windowMs
    message: 'Too many payment requests from this IP, please try again after an hour.',
});

// Logger middleware using Morgan
const morganFormat = ':method :url :status :response-time ms';
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            console.log(message.trim()); // log request details in the console
        }
    }
}));

// Create Payment Intent Route with Rate Limiting
app.post('/create-payment-intent', paymentIntentLimiter, async (req, res) => {
    const { amount, userId, products } = req.body;  // Assume userId and products are passed from frontend
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects the amount in cents
            currency: 'usd',
        });

        // Save order in MongoDB
        const newOrder = new Order({
            userId,
            products,
            amount,
            paymentIntentId: paymentIntent.id,
        });
        await newOrder.save();

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
