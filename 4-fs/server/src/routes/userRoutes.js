import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// http://localhost:3000/api/user/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Please fill all the fields');
    }
    if (password.length < 6) {
        return res.status(400).send('Password must be at least 6 characters long');
    }
    const newUser = new User({ name, email, password });
    try {
        await newUser.save();
        res.status(200).send('User registered successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
});

export default router;