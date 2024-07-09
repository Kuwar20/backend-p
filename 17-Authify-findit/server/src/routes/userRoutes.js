import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import { User } from '../model/userSchema.js';

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, ...additionalItems } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (Object.keys(additionalItems).length > 0) {
        return res.status(422).json({ error: "Please fill only the required fields" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})


// to send data to register endpoint using bruteforce
// import axios from 'axios';

// const dataForRegisterCheck = async () => {
//     const url = `http://localhost:3000/api/user/register`
//     const request = [];
//     try {
//         for(let i = 0; i < 50; i++) {
//             request.push(axios.post(url, {
//                 firstName: `firstName${i}`,
//                 lastName: `lastName${i}`,
//                 email: `email${i}@gmail.com`,
//                 password: `password`
//             }));
//             console.log(`User ${i} registered successfully`);
//         }
//     } catch (error) {
//         console.error("error signingup using bruteforce",error);
//         return;
//     }
//     await Promise.all(request);
// }

// dataForRegisterCheck();

export default router;