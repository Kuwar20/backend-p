import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);


/*

// this is how we check if the model is working or not
// we create a new document and save it to the database
// and then we fetch the document from the database
// if the document is fetched successfully then the model is working fine

// to run this code we need to import the User model from the userSchema.js 
// file in index file after connecting to the database

const testDoc = new User({
    name: "name1",
    email: "email1@gmail.com",
    password: "password1",
});

async function saveDocument() {
    try {
        const doc = await testDoc.save();
        console.log("Document inserted into db", doc);
    } catch (err) {
        console.error(err);
    }
}

saveDocument();

async function fetchDocument() {
    try {
        const doc = await User.find();
        console.log("Document fetched from db", doc);
    } catch (err) {
        console.error(err);
    }
}

fetchDocument(); 
*/