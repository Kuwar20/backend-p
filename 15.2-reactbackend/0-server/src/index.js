import express from 'express';
const app = express();
import createDBTable from './model/userSchema.js';

createDBTable();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});