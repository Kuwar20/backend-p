import express from 'express';
const router = express.Router();
import pool from '../utils/connMySQLdb.js';


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    try {
        const existingUser = pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "User with this email already exists, try login in" });
        }
        pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }
    try {
        // Fetch user by email
        const user = pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: "User not found, please signup" });
        }

        // Check if passwords match
        if (user.rows[0].password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "User logged in successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

export default router;