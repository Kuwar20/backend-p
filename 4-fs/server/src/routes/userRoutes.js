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

// http://localhost:3000/api/user/by-name/:name
router.get('/by-name/:name', async(req,res)=>{
    try {
        const userName = req.params.name;
        const name = await User.find({name:{$regex: new RegExp(userName, "i")}});

        if(!name){
            return res.status(404).send('No user found');
        }
        res.status(200).json(name);
        //res.status(200).send(name);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong: name search failed');
    }
})

// http://localhost:3000/api/user/by-number/:number
router.get('/by-number/:number', async(req,res)=>{
    try {
        const userNumber = req.params.number;
        const number = await User.find({number:{$regex: new RegExp(userNumber, "i")}});
        if(!number){
            return res.status(404).send('No user found');
        }
        res.status(200).json(number);
        //res.status(200).send(number);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong: number search failed');
    }
});

// http://localhost:3000/api/user/by-email/:email
router.get('/by-email/:email', async(req,res)=>{
    try {
        const userEmail = req.params.email;
        const email = await User.find({email:{$regex: new RegExp(userEmail, "i")}});
        if(!email){
            return res.status(404).send('No user found');
        }
        res.status(200).json(email);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong: email search failed');
    }
});

export default router;