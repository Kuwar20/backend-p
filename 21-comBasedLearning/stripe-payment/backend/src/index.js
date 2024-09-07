import express, { json } from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
const stripe = Stripe("your-secret-key"); // Use your Stripe secret key

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4001;
app.use(cors());
app.use(json());

app.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount } = req.body;

        // Create a PaymentIntent with the amount specified in the request
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
