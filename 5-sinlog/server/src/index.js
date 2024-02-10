import express from 'express';
import { connectDB } from './utils/conn.js';
const app = express();

/* 
// PART 3 - importing the userSchema from the user.js file, PART 1 & 2 are in the user.js file in the models folder
// so that we can see how the schema works in the db
import userSchema from './models/user.js'; 
*/

const PORT = process.env.PORT || 3000;

connectDB();

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})