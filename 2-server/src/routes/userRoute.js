import express from "express";
import User from "../models/user.js";

const router = express.Router();

//http://localhost:3000/api/user/create
router.post("/create", async (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).send("Please provide name and number");
    }
    // Check if 'number' is exactly 10 digits
    if (!/^\d{10}$/.test(number)) {
        return res.status(400).send("Number should be exactly 10 digits");
    }
    const newUser = new User({
        name,
        number
    });
    try {
        await newUser.save();
        res.status(201).send('User saved');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

// http://localhost:3000/api/user/all
router.get("/all", async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//to search a specific user from db using name because only number is unique
// http://localhost:3000/api/user/by-number/:number
router.get("/by-number/:number", async (req, res) => {
    try {
        const userNumber = req.params.number;
        const user = await User.findOne({ number: userNumber });

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


export default router;