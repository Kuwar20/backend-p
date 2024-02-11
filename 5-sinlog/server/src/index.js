import express from 'express';
import { connectDB } from './utils/conn.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
const app = express();

// to use the .env file
import dotenv from 'dotenv';
dotenv.config();


/* 
// PART 3 - importing the userSchema from the user.js file, PART 1 & 2 are in the user.js file in the models folder
// so that we can see how the schema works in the db
import userSchema from './models/user.js'; 
*/

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
connectDB();

// connect the frontend dist (build file) here statically on backend, so that we can see the frontend on the backend without having to run the frontend separately
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});


app.get('/', (req, res) => {

    res.status(201).send('Hello World'); // sends a string
    //o/p - Hello Worlds 

    /*
        res.status(201).send({ message: 'Hello World' }); // sends a JSON string
        o/p - {"message": "Hello World"} 
    */

    /*  
        res.status(201).json({ message: 'Hello World' });
        o/p - {"message": "Hello World"} 
    */

    /*
        res.status(201).json('Hello World');
        o/p - {"message": "Hello World"}
    */

});

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})