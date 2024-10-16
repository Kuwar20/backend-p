import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS for all routes

// Mock product data (simulating a database)
const products = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    price: (index + 1) * 10, // Example price
    image: "https://via.placeholder.com/150", // Placeholder image
}));

// Endpoint to get all products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
