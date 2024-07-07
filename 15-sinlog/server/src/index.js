import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());

app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;

import userRoutesMongo from './routes/userRoutesMongo.js';

import { connectDB } from './utils/connMongoDB.js';
connectDB();

// Rate limiter middleware
import rateLimiterMiddleware from './middlewares/rateLimiter.js';

// import { User } from './model/userSchemaMongo.js'; // to check if the connection is working or not


/*
import createDBTable  from './model/userSchemaSQL.js';
createDBTable();
*/

// app.get('/', (req, res) => {

//     /*  
//         const { name } = req.query;
//         //http://localhost:3000/?name=kuwar
//         // output: Hello kuwar!
//         res.send(`Hello ${name}!`); 
//     */

//     /*    
//         const { name } = req.body;
//         //http://localhost:3000/ with GET request and body: { "name": "kuwar" }
//         // output: Hello kuwar! ( ** To use this we need to use express json middleware once for the first time **)
//         res.send(`Hello ${name}!`);  
//     */

//     //res.send('Hello World!');
//     // output: Hello World!

//     //res.json({ message: 'Hello World!' });
//     // output: {"message":"Hello World!"}

//     //res.status(201).json({ message: 'Hello World!' });

//     //res.status(201).json({ error: 'Hello World!' });
//     // output: {"error":"Hello World!"}
// });


// // GET route with dynamic parameter
// app.get('/:name', (req, res) => {
//     const { name } = req.params;
//     // http://localhost:3000/kuwar
//     // output: Hello kuwar!
//     // http://localhost:3000/sam
//     // output: Hello sam!
//     res.send(`Hello ${name}!`);
// });

/*
app.post('/', (req, res) => {
    // const { name } = req.body;
    // res.send(`Hello ${name}!`);
    
    // this is the right way as it sends the status code 201 and the response in json format
    // const { name } = req.body;
    // res.status(201).json({ message: `Hello ${name}!` });
    
    // const { name } = req.query;
    // //http://localhost:3000/?name=kuwar
    // // output: Hello kuwar!
    // res.status(201).json({ message: `Hello ${name}!` });
    }); 
    */

app.use('/api/user', rateLimiterMiddleware, userRoutesMongo);

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server is running on port ' + PORT);
});