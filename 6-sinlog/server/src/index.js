import express from 'express';
const app = express();

import { connectDB } from './utils/conn.js';
connectDB(); // connect to database

import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
/* 
// (PART 3/3) - importing the userSchema from the user.js file, PART 1 & 2 are in the user.js file in the models folder
// so that we can see how the schema works in the db
import userSchema from './models/user.js';
*/
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(201).send('Test API');
})

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})