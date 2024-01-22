import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUser = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Doe", age: 24 },
    { id: 3, name: "Alice Smith", age: 30 },
    { id: 4, name: "Bob Johnson", age: 28 },
    { id: 5, name: "Emily Brown", age: 27 }
];

//base route - localhost:3000/ or http://127.0.0.1:3000/
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

{/* 1 start */ }

// //localhost:3000/ will return "Hello World"
// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

//localhost:3000/ will return {"message":"Hello World"} with status code 201 (check in network tab)
app.get("/", (req, res) => {
    res.status(201).send({ message: "Hello World" });
});

{/* 1 end */ }


{/* 2 start */ }

//localhost:3000/api/users will return - "all users" / [{"id":1,"name":"John Doe","age":25},{"id":2,"name":"Jane Doe","age":24}]

app.get("/api/users", (req, res) => {
    console.log(req.query); 
    // { filter: 'name', value: 'ice' } for http://localhost:3000/api/users?filter=name&value=ice
    
    // destructuring query parameters
    const { query: { filter, value }, } = req;

    // // when filter is undefined and value is defined
    // if(filter && value){
    //     const findUser = mockUser.filter((user) => user[filter].includes(value));
    //     return res.send(findUser); 
    // }
    
    // even though the above code works, it searches for the exact match of the value.
    // for example, if we search for "ice" in name, it will return Alice
    // but if we search for "ICE" in name, it will return nothing
    // to solve this, we can use regex
    if(filter && value){
        const regex = new RegExp(value, 'i');
        const findUser = mockUser.filter((user) => regex.test(user[filter]));
        return res.send(findUser); 
    };

    return res.send(mockUser);
});

{/* 2 end */ }


{/* 3 start */ }

// http://localhost:3000/api/users/1234 will return - "specific user" Not Found
// http://localhost:3000/api/users/asdsaf will return - {"message":"Invalid ID supplied"}
// http://localhost:3000/api/users/1 will return - {"id":1,"name":"John Doe","age":25}

app.get("/api/users/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).send({ message: "Invalid ID supplied" });
    } else {
        const findUser = mockUser.find((user) => user.id === parsedId);
        if (!findUser) return res.sendStatus(404);
        return res.send(findUser);
    }
});

{/* 3 end */ }


{/* 4 start */ }

app.get("/api/products", (req, res) => {
    res.send([
        { id: 123, name: "Product 1", price: 100 },
        { id: 234, name: "Product 2", price: 200 }
    ])
})
{/* 4 end */ }

