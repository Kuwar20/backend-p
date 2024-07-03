import pool from '../utils/connMySQLdb.js';

// Function to create database and table
const createDBTable = () => {
    // Adjust these values as per your requirements
    const dbName = '15sinlog';
    const tableName = 'users';

    // Create database and table if they don't exist
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        // Create database if it doesn't exist
        connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
            if (err) {
                console.error('Error creating database:', err);
                connection.release();
                return;
            }
            console.log(`Database '${dbName}' created or already exists`);

            // Use the newly created database
            connection.query(`USE ${dbName}`, (err) => {
                if (err) {
                    console.error('Error using database:', err);
                    connection.release();
                    return;
                }
                console.log(`Using database '${dbName}'`);

                // Create table if it doesn't exist
                const createTableQuery = `
                    CREATE TABLE IF NOT EXISTS ${tableName} (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(50) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        password VARCHAR(100) NOT NULL
                    )
                `;
                connection.query(createTableQuery, (err) => {
                    connection.release();
                    if (err) {
                        console.error('Error creating table:', err);
                        return;
                    }
                    console.log(`Table '${tableName}' created or already exists`);

                    // create

                    // const insertQuery = `INSERT INTO ${tableName} (name, email,password) VALUES ('kuwar','kuwar@gmail.com','password')`;
                    // connection.query(insertQuery, (err, results) => {
                    //     connection.release();
                    //     if (err) {
                    //         console.error('Error inserting data:', err);
                    //         return;
                    //     }
                    //     console.log('Inserted hardcoded data successfully');
                    //     console.log(results); // Inserted rows info
                    // });

                    // read

                    // const selectQuery = `SELECT * FROM ${tableName}`;
                    // connection.query(selectQuery, (err, results) => {
                    //     connection.release();
                    //     if (err) {
                    //         console.error('Error selecting data:', err);
                    //         return;
                    //     }
                    //     console.log('Selected data successfully');
                    //     console.log(results); // Selected rows info
                    // });

                    // update

                    // const updateQuery = `UPDATE ${tableName} SET name='kuwarx' WHERE name='kuwar'`;
                    // connection.query(updateQuery, (err, results) => {
                    //     connection.release();
                    //     if (err) {
                    //         console.error('Error updating data:', err);
                    //         return;
                    //     }
                    //     console.log('Updated data successfully');
                    //     console.log(results); // Updated rows info
                    // });

                    // delete
                    // const deleteQuery = `DELETE FROM ${tableName} WHERE name='kuwarx'`;
                    // connection.query(deleteQuery, (err, results) => {
                    //     connection.release();
                    //     if (err) {
                    //         console.error('Error deleting data:', err);
                    //         return;
                    //     }
                    //     console.log('Deleted data successfully');
                    //     console.log(results); // Deleted rows info
                    // });
                });
            });
        });
    });
};

export default createDBTable;
