import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUser = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Doe", age: 24 },
];

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

//localhost:3000/api/users will return [{"id":1,"name":"John Doe","age":25},{"id":2,"name":"Jane Doe","age":24}]

app.get("/api/users", (req, res) => {
    res.send(mockUser);
});

{/* 2 end */ }


{/* 3 start */ }

// http://localhost:3000/api/users/1234 will return - Not Found
// http://localhost:3000/api/users/asdsaf will return - {"message":"Invalid ID supplied"}
// http://localhost:3000/api/users/1 will return - {"id":1,"name":"John Doe","age":25}

app.get("/api/users/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).send({ message: "Invalid ID supplied" });
    }else{
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

//base route - localhost:3000/ or http://127.0.0.1:3000/
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})