import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Create a WebSocket server
// we can use https://hoppscotch.io/realtime/websocket and use ws://localhost:8080
// or use postman and create new websocket api

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {

    ws.on("message", (message) => {
        console.log("data from client: ", message); // data from client in buffer
        console.log("data from client: %s", message); // data from client in string
        ws.send(`Server received: ${message}`);
    })

    ws.on("close",()=>console.log("Client disconnected"));
})