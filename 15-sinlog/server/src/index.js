import express from 'express';
const app = express();

app.use(express.json());


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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});