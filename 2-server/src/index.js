import express from "express";
const app = express();
import userRoutes from "./routes/userRoute.js";
import { connectDB } from "./utils/features.js";
import cors from "cors";

connectDB();

// to allow the frontend to access the backend
app.use(cors({ origin: 'http://localhost:5173' }));

// to send json data to the mongodb database
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running');
})

app.use('/api/user', userRoutes)

app.listen(3000, () => {
    console.log('server on port 3000');
})