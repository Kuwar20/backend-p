import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./utils/connDB.js";
connectDB();

/* 
// (PART 3/3) - importing the userSchema from the user.js file, PART 1 & 2 are in the user.js file in the models folder
// so that we can see how the schema works in the db
import userSchema from './models/user.js';
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});