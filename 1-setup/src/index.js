import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUser = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Doe", age: 24 },
    { id: 3, name: "Alice Smith", age: 30 },
    { id: 4, name: "Bob Johnson", age: 28 },
    { id: 5, name: "Emily Brown", age: 27 }
];

//When you run a Node.js application with this code, it turns your computer into a server. The server is a program that listens for incoming requests from the internet and responds to them. In this case, it's a basic server, 
//base route - localhost:3000/ or http://127.0.0.1:3000/
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

{/* 1 start */ }

// localhost:3000/ will return "Hello World"
// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

//localhost:3000/ will return {"message":"Hello World"} with status code 201 (check in network tab)
app.get("/", (req, res) => {
    res.status(201).send({ message: "Hello World" });
});
// HTTP is a protocol used for communication between a client (like a web browser) and a server. It is the foundation of data communication on the World Wide Web.
// How it Works: When you open a website in your browser, the browser sends an HTTP request to the server hosting the website, asking for specific resources (like HTML pages, images, or scripts). The server then responds with the requested data.
// HTTPS is an extension of HTTP with an additional layer of security provided by SSL/TLS (Secure Sockets Layer/Transport Layer Security) protocols.
// HTTPS encrypts the data exchanged between the client and server, ensuring that it remains secure and confidential. This is crucial for protecting sensitive information like login credentials, personal details, and financial transactions.

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
    if (filter && value) {
        const regex = new RegExp(value, 'i');
        const findUser = mockUser.filter((user) => regex.test(user[filter]));
        return res.send(findUser);
    };

    return res.send(mockUser);
});

{/* 2 end */ }


{/* 2.1 start */ }

// http://localhost:3000/api/users will return - {"id":6,"name":"Kuwar-Singh","age":"45"} and then increment id by 1 every time we send the body
// when we send the body - {"name": "Kuwar-Singh","age": "45"}

app.post("/api/users", (req, res) => {
    // console.log(req.body);
    const { body } = req;
    const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body };
    mockUser.push(newUser);
    return res.status(201).send(newUser);
})
// to make it work, we need to add middleware - app.use(express.json());
// now it will return OK in postman and it will console output whatever we send in postman body

{/* 2.1 end */ }


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


{/* 5 start */ }

// PUT- http://localhost:3000/api/users/2 will return with body {"name":"John Doe 2","age": "25"} it will return ok
// GET- http://localhost:3000/api/users/2 will return - {"id":2,"name":"John Doe 2","age":"25"}

app.put("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = mockUser.findIndex(
        (user) => user.id === parsedId
    )

    if (findUserIndex === -1) return res.sendStatus(404);

    mockUser[findUserIndex] = { id: parsedId, ...body };
    return res.sendStatus(200);
})

{/* 5 end */ }

{/* 6 start */ }


// PATCH- http://localhost:3000/api/users/2 with body {"name":"kuwar singh patch request"} it will return ok
// GET- http://localhost:3000/api/users/2 will return - {"id":2,"name":"kuwar singh patch request","age":"24"}

app.patch("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = mockUser.findIndex(
        (user) => user.id === parsedId
    )

    if (findUserIndex === -1) return res.sendStatus(404);

    mockUser[findUserIndex] = { ...mockUser[findUserIndex], ...body };
    return res.sendStatus(200);
})


{/* 6 end */ }

{/* 7 start */ }

// DELETE- http://localhost:3000/api/users/2 will return ok
// GET- http://localhost:3000/api/users/2 will return - Not Found

app.delete("/api/users/:id", (req, res) => {
    const { params: { id } } = req;
    // or const id = req.params.id; or const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = mockUser.findIndex(
        (user) => user.id === parsedId
    )

    if (findUserIndex === -1) return res.sendStatus(404);

    mockUser.splice(findUserIndex, 1);
    return res.sendStatus(200);
});