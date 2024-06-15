import mongoose from "mongoose";

/* 
//(PART 1/3)
// checking how this schema works in the db 

import { connectDB } from '../utils/connDB.js';
connectDB();
 */

const Schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', Schema);

/* 
    This line creates a Mongoose model from the User schema.
    Note that Mongoose will lowercase the name and pluralize it. So in our MongoDB database, 
    the collection will actually be named "users", not "User". 
*/


/*
// checking how this schema works in the db (PART 2/3)

// Create a new user with hardcoded values in db from here
const user = new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
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