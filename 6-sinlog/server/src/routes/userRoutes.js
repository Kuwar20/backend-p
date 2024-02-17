import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
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

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gender
        })

        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
})

/* 
    this is not actually login, it does somethings in the backend when we hit this api with email and password,
    then it returns a message "User logged in successfully" if everything is fine
    this does not actually login the user, it just checks if the user exists in the db and if the password is correct
 */
router.post('/login', async (req, res) => {

    // for 'login' we use body because we are sending sensitive data like password, and same for the 'register api'
    /*     
        //get email and password from the request body
        
        const { email, password } = req.body;
        its frontend will be:
            const response = await fetch(`http://localhost:3000/api/user/login`, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({ email, password })
                })
                const data = await response.json(); 
    */

    /*
        // or get email and password from the query parameters / api url
        
        const { email, password } = req.query;
        its frontend will be:
        const response = await fetch(`http://localhost:3000/api/user/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'POST',
        })
     */

    // this is the mix of both, it will first check the request body and if email and password are not found in the request body, then it will check the query parameters
    // and for frontend it will use way 1
    let { email, password } = req.body; // Extract email and password from the request body
    // If email and password are not found in the request body,then check the query parameters
    if (!email || !password) {
        email = req.query.email;
        password = req.query.password;
    }

    if (!email || !password) {
        return res.status(400).send('All input is required');
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        res.send('User logged in successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});

router.delete('/delete', async (req, res) => {
    const { email } = req.body;
    // validate input fields
    if (!email) {
        return res.status(400).send('All input is required');
    }
    try {
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(400).send('User does not exist');
        }
        res.status(404).send('User deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});

export default router;