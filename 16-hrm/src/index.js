import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './utils/connectDB.js'
connectDB()

import Department from './models/Department.js'
import Employee from './models/Employee.js'
import Position from './models/Position.js'
import User from './models/User.js'

app.use(express.json())
app.use('/api/employees/', Employee);
app.use('/api/departments/', Department);
app.use('/api/positions/', Position);
app.use('/api/users/', User);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
});