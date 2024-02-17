import express from 'express';
import User from '../models/user.js';
const router = express.Router();

// this creates db and make empty "users" collection
router.post('/register', async (req, res) => {

    const { name, email, password, gender } = req.body;
    // validate input fields
    if (!name || !email || !password || !gender) {
        return res.status(400).send('All input is required');
    }
    if (password.length < 6) {
        return res.status(400).send('Password must be at least 6 characters');
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const newUser = new User({
            name,
            email,
            password,
            gender
        })
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
})

export default router;