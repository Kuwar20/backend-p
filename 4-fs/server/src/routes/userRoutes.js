import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// http://localhost:3000/api/user/register
router.post('/register', async (req, res) => {
    const { name, email, number } = req.body;
    if (!name || !email || !number) {
        return res.status(400).send('Please fill all the fields');
    }
    if (number.length < 6) {
        return res.status(400).send('number must be at least 6 characters long');
    }
    const newUser = new User({ name, email, number });
    
    try {
        await newUser.save();
        res.status(200).send('User registered successfully');
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send('Email or number already registered');
        } else {
            console.log(err);
            res.status(500).send('Something went wrong');
        }
    }
});

export default router;