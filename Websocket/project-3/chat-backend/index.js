// server.js
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

// Initialize Express app
const app = express();
app.use(cors());

// Create HTTP server using Express app
const server = createServer(app);

// Create WebSocket server attached to HTTP server
const wss = new WebSocketServer({ server });

// Store all active connections
const clients = new Set();

// WebSocket connection handler
wss.on('connection', (ws) => {
    // Add new client to the set of active connections
    clients.add(ws);
    console.log('New client connected');

    // Send welcome message to the newly connected client
    ws.send(JSON.stringify({
        type: 'message',
        content: 'Welcome to the chat!',
        sender: 'System'
    }));

    // Handle incoming messages
    ws.on('message', (data) => {
        try {
            // Parse the incoming message
            const message = JSON.parse(data);
            console.log('Received message:', message);
            
            // Broadcast the message to all connected clients
            clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify({
                        type: 'message',
                        content: message.content,
                        sender: message.sender
                    }));
                }
            });
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});