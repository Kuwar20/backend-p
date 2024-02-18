import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/auth.js';
const router = express.Router();

const JWT_SECRET = 'your_secret_key';

/* 
http request type: POST
URL: http://localhost:3000/api/user/register
body (JSON) = {"name":"test1","email":"email1@gmail.com","password":"password1","gender":"male"}
response/output = {User created successfully} 
// and if somebody try to register with same email again then it will give error
{"error": "User with this email already exists"}
*/

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
            return res.status(400).send('User with this email already exists');
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


/* 
way 1:
http request type: POST
URL: http://localhost:3000/api/user/login
body = {"email":"email1","password":"abc132"}
response/output = {"message": "User logged in successfully","token" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE3MDc1NzgwMDAsImV4cCI6MTcwNzU4MTYwMH0.qmnPkbBS-JWlA5goU6Rnc7IkJD140YnsHL85DdgtxrY"}
// and if somebody try to login with wrong email or password then it will give error 
{"error": "Invalid email or password"}
*/
/*
way 2:
http request type: POST
URL: localhost:3000/api/user/login?email=email1&password=abc132
body = {} // empty
response/output = same as way 1
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
            return res.status(400).send('Invalid email or password');
        }

        // Compare password from the request and the password from the database

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // it will return the token which will be used to verify the user to make some specific requests such as delete user, update user, etc
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});

/*
http request type: DELETE
URL: http://localhost:3000/api/user/delete
body = {"email":"email1"}
response/output = 
{
    "message": "User deleted successfully",
    "user": {
        "_id": "65c7918dbb9ef834d2cedd36",
        "name": "pil",
        "email": "email1",
        "gender": "male",
        "password": "$2a$10$ofbFBi8cW/uWcGYVyQ/RcewSxF1GnbgogT3Fz/rKD3lazCsmYyx3i",
        "createdAt": "2024-02-10T15:09:01.999Z",
        "updatedAt": "2024-02-17T19:11:26.629Z",
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
    const { email } = req.body;

    const authenticatedUserEmail = req.user.email;

    // validate input fields
    if (!email) {
        return res.status(400).send('All input is required');
    }
    if (email !== authenticatedUserEmail) {
        return res.status(403).json({ error: "Unauthorized access" });
    }
    try {
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(400).send('User does not exist');
        }
        // If user is found and deleted, send success response
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});

export default router;