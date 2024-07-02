// Get the client
import mysql from 'mysql2';

// Create the connection to database (apache server and mysql server must be running)
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
    port: 3307
});

export default pool;