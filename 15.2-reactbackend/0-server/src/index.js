import express from 'express';
const app = express();


import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;

// make DB using mySQL
// import createDBTable from './model/userSchema.js';
// createDBTable();

// make DB using mongoDB
import { connectDB } from './utils/connDBmongo.js';
connectDB();

import cors from 'cors';
app.use(cors());

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT );
});