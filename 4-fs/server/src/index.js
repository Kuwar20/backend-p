import express from 'express';
const app = express();
import { connectDB } from './utils/conn.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

app.use(cors());

connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})