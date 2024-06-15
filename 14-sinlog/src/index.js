import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./utils/connDB.js";
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});