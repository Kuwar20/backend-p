import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

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