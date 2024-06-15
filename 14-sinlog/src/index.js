import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./utils/connDB.js";
connectDB();

import userRoutes from "./routes/userRoutes.js";

/* 
// (PART 3/3) - importing the userSchema from the user.js file, PART 1 & 2 are in the user.js file in the models folder
// so that we can see how the schema works in the db
import userSchema from './models/user.js';
*/
const PORT = process.env.PORT || 3000;

app.use(express.json());
/* 
 without this line of code, the server will not be able to read the request body,
 and give error => TypeError: Cannot destructure property 'name' of 'req.body' as it is undefined.
*/

app.get("/", (req, res) => {
    res.send("Test api");
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
