import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        console.log("data from client: ", data); // data from client in buffer
        console.log("data from client: %s", data); // data from client in string
        ws.send("data received");
    })
})