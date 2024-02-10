import express, { response } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = 'your_secret_key';

/* 
http://localhost:3000/api/user/register
body = {"name":"test1","email":"email1@gmail.com","password":"password1"}
response/output = {"message": "User registered successfully"} 

// and if somebody try to register with same email again then it will give error
{"error": "User with this email already exists"}

*/

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please provide all the required fields" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    try {
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

/* 
http://localhost:3000/api/user/login
body = {"email":"email1@gmail.com","password":"password1"}
response/output = {"message": "User logged in successfully","token" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE3MDc1NzgwMDAsImV4cCI6MTcwNzU4MTYwMH0.qmnPkbBS-JWlA5goU6Rnc7IkJD140YnsHL85DdgtxrY"}

// and if somebody try to login with wrong email or password then it will give error 
{"error": "Invalid email or password"}

*/

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password" });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // If user is not found, return error
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email },JWT_SECRET, { expiresIn: '1h' });

        // If user is found and password matches, send success response
        res.status(200).json({ message: "User logged in successfully", token  });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

/* 
http://localhost:3000/api/user/delete
body = {"email": "email1@gmail.com"}
response/output = 
{
    "message": "User deleted successfully",
    "user": {
        "_id": "65c7918dbb9ef834d2cedd36",
        "name": "test1",
        "email": "email1@gmail.com",
        "password": "$2a$10$ofbFBi8cW/uWcGYVyQ/RcewSxF1GnbgogT3Fz/rKD3lazCsmYyx3i",
        "createdAt": "2024-02-10T15:09:01.999Z",
        "__v": 0
    }
}

//to ensure that only the user with the same email can delete only their account

we send Authorization in header with token,
this token is generated when user login with and it is valid for 1 hour 
now we can use that token to ensure that user only delete their account

ex - Key: Authorization , Value: Bearer <JWT Token>
live ex - Key: Authorization, Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMkBnbWFpbC5jb20iLCJpYXQiOjE3MDc1Nzc2MDAsImV4cCI6MTcwNzU4MTIwMH0.ZYNU6Ksx96dMGOv2koocnuiiRLaLFC5QyrQ4jAHpEvo

// and if somebody try to delete user with wrong email or delete the deleted user then it will give error
{"error": "Unauthorized access"} 

*/

router.delete('/delete', authenticateToken, async (req, res) => {
    try {
        const { email } = req.body;
        const authenticatedUserEmail = req.user.email;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ error: "Please provide email" });
        }

        if (email !== authenticatedUserEmail) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        // Find user by email and delete
        const deletedUser = await User.findOneAndDelete({ email });

        // If user is not found, return error
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // If user is found and deleted, send success response
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;