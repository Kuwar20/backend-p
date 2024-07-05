import express from 'express';
const router = express.Router();
import { User } from '../model/userSchemaMongo.js';

router.post('/signup', async (req, res) => {

    const { name, email, password, ...additionalFields } = req.body;

    // 1- to check name, email and password are passed in the body of the "signup" api
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }
    // 2- check if any additional fields (other than name, email and password) are passed in the body
    if (Object.keys(additionalFields).length > 0) {
        return res.status(400).json({ error: "Additional fields found in request body" });
    }
    // 1 and 2 together make sure that only name, email and password are passed in the body of the "signup" api

    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists, try Login" });
        }
        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password, ...additionalFields } = req.body; // This tells that we will be sending email and password in "login" api
    // in json in insomnia/postman and here we are storing those email and password in json format
    // to use it further in mongodb

    /*     
    console.log({email, password}); // this is logging the email and password in JSON from the "login" api of insomnia/postman { email: 'hiii@gmail.com', password: '123456' }
    console.log(req.body); // this is logging the body of the body of the "login" api of insomnia 
    // which is : { name: 'names1', email: 'hiii@gmail.com', password: '123456' } 
    console.log(email, password); // this is logging the email and password directly and not in JSON from the "login" api of insomnia/postman

    WE SEND MONGODB QUERY IN JSON FORMAT, SO WE NEED TO USE JSON FORMAT TO GET THE DATA FROM THE BODY
*/
    // 1- to check email and password are passed in the body of the "login" api
    if (!email || !password) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    // the body should be only be email and password fields and nothing else should be passed
    // if (Object.keys(req.body).length > 2) {
    //     return res.status(400).json({ error: "Please provide only email and password" });
    // }

    // better way to do this is to check if any additional fields are passed in the body
    // const additionalFields = Object.keys(req.body).filter(key => !['email', 'password'].includes(key));
    // if (additionalFields.length > 0) {
    //     return res.status(400).json({ error: "Additional fields found in request body" });
    // }

    // that way can be not scalable. If we need to add more required fields in the future, we need to change the additionalFields array code too

    // 2- Best way is to check if any additional fields are passed in the body
    if (Object.keys(additionalFields).length > 0) {
        return res.status(400).json({ error: "Additional fields found in request body" });
    }

    try {
        const user = await User.findOne({ email });
        // console.log({email}); // this is logging the email in JSON from the "login" api body of insomnia/postman { email: 'hiii@gmail.com' }
        // console.log(user); // this is logging the user data in JSON format from the "login" api body of insomnia/postman {
        // //     _id: new ObjectId('668830bf134969b8d0301581'),
        // //     name: 'names1',
        // //     email: 'hiii@gmail.com',
        // //     password: '123456',
        // //     date: 2024-07-05T17:43:27.720Z,
        // //     createdAt: 2024-07-05T17:43:27.720Z,
        // //     updatedAt: 2024-07-05T17:43:27.720Z,
        // //     __v: 0
        // //   }
        if (!user) {
            return res.status(400).json({ error: "User not found, please signup" });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ message: "User logged in successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

router.get('/search/:query', async (req, res) => {
    const { query } = req.params;
    const { page, limit } = req.query;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 5;

    if (!query) {
        return res.status(400).json({ error: "Please provide a search query" });
    }

    try {
        const searchResults = await User.find({ name: { $regex: query, $options: 'i' } })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage);
        res.status(200).json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

export default router;