import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key';

const registerUser = async (req, res) => {
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
};

const loginUser = async (req, res) => {
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
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // If user is found and password matches, send success response
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteUser = async (req, res) => {
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
};

export { registerUser, loginUser, deleteUser };
