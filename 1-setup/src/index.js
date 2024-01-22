import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

{/* 1 start */}

// //localhost:3000/ will return "Hello World"
// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

//localhost:3000/ will return {"message":"Hello World"} with status code 201 (check in network tab)
app.get("/", (req, res) => {
    res.status(201).send({ message: "Hello World" });
});

{/* 1 end */}


{/* 2 start */}

//localhost:3000/api/users will return [{"id":1,"name":"John Doe","age":25},{"id":2,"name":"Jane Doe","age":24}]
app.get("/api/users", (req, res) => {
    res.send([
        { id: 1, name: "John Doe", age: 25 },
        { id: 2, name: "Jane Doe", age: 24 },
    ]);
});

{/* 2 end */}


{/* 3 start */}

app.get("/api/products", (req,res)=>{
    res.send([
        {id:123, name:"Product 1", price: 100},
        {id:234, name:"Product 2", price: 200}
    ])
})
{/* 3 end */}

//base route - localhost:3000/ or http://127.0.0.1:3000/
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})