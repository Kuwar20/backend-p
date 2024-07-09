import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json());


import { connectDB } from './utils/connDB.js';
connectDB();

//import { User } from './model/userSchema.js'; // to check if the connection is working or not

import { rateLimiterMiddleware } from './middlewares/rateLimiter.js';

import userRoutes from './routes/userRoutes.js';

import cors from 'cors';
app.use(cors());

import logger from '../logger.js';
import morgan from 'morgan';

const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],
            };
            logger.info(JSON.stringify(logObject));
        }
    }
}));

app.use('/api/user', rateLimiterMiddleware, userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})