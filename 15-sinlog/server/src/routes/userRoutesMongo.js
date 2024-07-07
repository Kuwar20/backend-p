import express from 'express';
const router = express.Router();
import { User } from '../model/userSchemaMongo.js';

import cacheMiddleware from '../middlewares/cacheMiddleware.js';
import bcrypt from 'bcryptjs';

router.post('/signup', async (req, res) => {

    const { name, email, password, ...additionalFields } = req.body;

    // 1-Required Fields Check: to check name, email and password are passed in the body of the "signup" api
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }
    // 2-Additional Fields Check: check if any additional fields (other than name, email and password) are passed in the body
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
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        // this is how newUser Looks like
        // const newUser = new User({
        //     name: "nameInReqBody",
        //     email: "emailInReqBody@gmail.com",
        //     password: "passwordInReqBody",
        // });
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
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Invalid credentials1" });
        }
        res.status(200).json({ message: "User logged in successfully", user: { _id: user._id, email: user.email }});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

router.get('/search/:query', cacheMiddleware, async (req, res) => {
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

// update name and password
// also check if the password is same as the old password
// router.put('/update', async (req, res) => {
//     const { email, name, password, ...additionalFields } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: "Please provide email" });
//     }

//     if (!name && !password) {
//         return res.status(400).json({ error: "Please provide something to update" });
//     }

//     if (Object.keys(additionalFields).length > 0) {
//         return res.status(400).json({ error: "Additional fields found in request body" });
//     }

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ error: "User not found" });
//         }

//         if (name) {
//             if (user.name === name) {
//                 return res.status(400).json({ error: "New name must be different from the old name" });
//             }
//             user.name = name;
//         }

//         if (password) {
//             if (user.password === password) {
//                 return res.status(400).json({ error: "New password must be different from the old password" });
//             }
//             user.password = password;
//         }

//         await user.save();
//         res.status(200).json({ message: "User updated successfully" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Something went wrong, please try again" });
//     }
// });

router.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, oldPassword, newPassword } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "Please provide user ID" });
    }

    if (!name && !oldPassword && !newPassword) {
        return res.status(400).json({ error: "Please provide something to update" });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (name) {
            user.name = name;
        }

        if (oldPassword && newPassword) {
            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
            if(oldPassword === newPassword) {
                return res.status(400).json({ error: "password cannot be same as old password" });
            }

            if (!isPasswordMatch) {
                return res.status(400).json({ error: "password cannot be same as old password" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});


// router.delete('/delete', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: "Please provide email" });
//     }

//     try {
//         const deletedUser = await User.findOneAndDelete({ email });
//         if (!deletedUser) {
//             return res.status(400).json({ error: "User not found" });
//         }
//         res.status(200).json({ message: "User deleted successfully" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Something went wrong, please try again" });
//     }
// });
router.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    
    if (!userId) {
        return res.status(400).json({ error: "Please provide user ID" });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(400).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

export default router;