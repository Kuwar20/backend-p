import express from "express";
const app = express();
import userRoutes from "./routes/userRoute.js";
import { connectDB } from "./utils/features.js";

connectDB();

// to send json data to the mongodb database
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running');
})

app.use('/api/user', userRoutes)

app.listen(3000, () => {
    console.log('server on port 3000');
})