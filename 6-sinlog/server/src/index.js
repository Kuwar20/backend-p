import express from 'express';
const app = express();

import { connectDB } from './utils/conn.js'; 
connectDB(); // connect to database

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.status(201).send('Test API');
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})