import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import { User } from '../model/userSchema.js';
import { loginRateLimiterMiddleware, loginRateLimiter } from '../middlewares/rateLimiter.js'

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, ...additionalItems } = req.body;

    // we will be sending either "error" or "message" as json response
    // so that in frontend we only need to check only "error" or "message" key in response

    if (!firstName || !lastName || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (Object.keys(additionalItems).length > 0) {
        return res.status(422).json({ error: "Please fill only the required fields" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', loginRateLimiterMiddleware, async (req, res) => {
    const { email, password, ...additionalItems } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (Object.keys(additionalItems).length > 0) {
        return res.status(422).json({ error: "Please fill only the required fields" });
    }

    try {
        const user = await User.findOne({ email });
        // if (!user) {
        //     return res.status(422).json({ error: "Invalid credentials" });
        // }
        if (!user) {
            // User not found, consume an additional point
            await loginRateLimiter.consume(req.ip);
            return res.status(400).json({ error: "User not found, please signup" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        // if (!isPasswordMatch) {
        //     return res.status(422).json({ error: "Invalid credentials" });
        // }
        if (!isPasswordMatch) {
            // Wrong password, consume an additional point
            await loginRateLimiter.consume(req.ip);
            return res.status(400).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;