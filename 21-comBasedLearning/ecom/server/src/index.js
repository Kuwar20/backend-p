// server.js
import express, { json } from 'express';
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const PORT = process.env.PORT || 5001;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

import logger from '../logger.js';
import morgan from 'morgan';

const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],

            };
            logger.info(JSON.stringify(logObject));
        }
    }
}));

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects the amount in cents
            currency: 'usd',
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
