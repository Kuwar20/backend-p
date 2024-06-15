import express from "express";
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/auth.js';

const JWT_SECRET = 'SECRET_KEY';
const router = express.Router();

router.get('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})


router.post('/login', async (req, res) => {
    // make this let instead of const, so that when we dont send any value in the request body, we can still check the query parameters,
    // in case we have email and password as const, and we dont send email and password in the request body, then we will get an error and it will stop the server "Assignment to constant variable"
    // this wont happen if we use let
    let { email, password } = req.body; // Extract email and password from the request body

    // If email and password are not found in the request body,then check the query parameters
    if (!email || !password) {
        email = req.query.email;
        password = req.query.password;
    }

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({email:user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        // const token = jwt.sign({email:user.email}, JWT_SECRET, {expiresIn: '1h'}); // or use this without the .env file

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})


router.delete('/delete', authenticateToken, async (req, res) => {
    const { email } = req.body;

    const authenticatedUser = req.user.email;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if(authenticatedUser !== email){
        return res.status(400).json({ message: "You are not authorized to delete this user" });
    }
    try {
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

export default router;