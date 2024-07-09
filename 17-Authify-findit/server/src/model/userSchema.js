import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        // min: 3,
        // max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        // min: 3,
        // max: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        // match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.model('User', userSchema);


// this is how we check if the model is working or not
// we create a new document and save it to the database
// and then we fetch the document from the database
// if the document is fetched successfully then the model is working fine

// to run this code we need to import the User model from the userSchema.js 
// file in index file after connecting to the database


// const testDoc = new User({
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'Test@gmail.com',
//     password: 'password',
// });

// const saveDoc = async () => {
//     try {
//         const doc = await testDoc.save();
//         console.log('Document saved', doc);
//     } catch (err) {
//         console.error(err);
//     }
// };
// saveDoc();

// const fetchDoc = async () => {
//     try {
//         const doc = await User.find();
//         console.log("Document fetched", doc);
//     } catch (err) {
//         console.error(err);
//     }
// };
// fetchDoc();