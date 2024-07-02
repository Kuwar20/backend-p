import express from 'express';
const app = express();

const PORT = process.env.PORT || 3001;

import dotenv from 'dotenv';
dotenv.config();

// make DB using mySQL
// import createDBTable from './model/userSchema.js';
// createDBTable();

// make DB using mongoDB
import { connectDB } from './utils/connDBmongo.js';
connectDB();

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});