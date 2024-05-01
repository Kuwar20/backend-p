import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './database/dbConnection.js';

const app = express();
dotenv.config({ path: './config/config.env' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

export default app;