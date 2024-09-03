import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// export const connectDB = async () => {
mongoose
    .connect(process.env.MONGO_URI, { dbName: process.env.dbName })
    .then((c) => console.log(`Connected to ${c.connections[0].name} database`))
    .catch((err) => console.log(`Error connecting to database: ${err.message}`));
//}

// Sample route
app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
