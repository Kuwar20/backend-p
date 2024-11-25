// Backend - server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const uri = process.env.DB_URI;
const pool = mysql.createPool(uri).promise();

// Create notes table if it doesn't exist
async function initializeDatabase() {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        lastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
        console.log("Database initialized successfully");
    } catch (err) {
        console.error("Error initializing database:", err);
    }
}

initializeDatabase();

// Routes
// Get all notes
app.get("/api/notes", async (req, res) => {
    try {
        const [notes] = await pool.query(
            "SELECT * FROM notes ORDER BY lastModified DESC"
        );
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a note
app.post("/api/notes", async (req, res) => {
    const { title, content } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO notes (title, content) VALUES (?, ?)",
            [title, content]
        );

        const [newNote] = await pool.query("SELECT * FROM notes WHERE id = ?", [
            result.insertId,
        ]);

        res.status(201).json(newNote[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a note
app.put("/api/notes/:id", async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    try {
        const [existingNote] = await pool.query(
            "SELECT * FROM notes WHERE id = ?",
            [id]
        );

        if (existingNote.length === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        await pool.query("UPDATE notes SET title = ?, content = ? WHERE id = ?", [
            title,
            content,
            id,
        ]);

        const [updatedNote] = await pool.query("SELECT * FROM notes WHERE id = ?", [
            id,
        ]);

        res.json(updatedNote[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
    try {
        const [existingNote] = await pool.query(
            "SELECT * FROM notes WHERE id = ?",
            [req.params.id]
        );

        if (existingNote.length === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        await pool.query("DELETE FROM notes WHERE id = ?", [req.params.id]);
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
