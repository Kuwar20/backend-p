import mysql from 'mysql2';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
    port: 3307
});

export default pool;