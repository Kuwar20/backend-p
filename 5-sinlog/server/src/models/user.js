import mongoose from 'mongoose';

/*
(PART 1/3)
// checking how this schema works in the db 

import { connectDB } from '../utils/conn.js';
connectDB(); 
*/

// even after part 1 and 2 this wont do as intended,
// because we are not exporting the User model to the index.js file hence it is invisbile to the index.js file
// hence we need to export the User model to the index.js file even though we will be not using it in the index.js file

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', userSchema);

/*
// checking how this schema works in the db (PART 2/3)

// Create a new user with hardcoded values in db from here
const user = new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
});
console.log('About to save user');

// Save the user to the database
user.save()
    .then(doc => {
        console.log('User saved successfully', doc);
    })
    .catch(err => {
        console.error('Error saving user', err);
    });
*/

export default User;