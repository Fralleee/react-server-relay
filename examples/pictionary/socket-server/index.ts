import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import { socketMiddleware } from "react-socket-relay";
import { RoomManager } from "react-socket-relay";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Adjust CORS as needed
    methods: ["GET", "POST"],
  },
});

const roomManager = new RoomManager();

socketMiddleware(io, roomManager, {
  onRoomCreated: (roomId, adminId, settings) => {
    console.log(`Room created: ${roomId} by ${adminId}`);
    // Custom logic here (e.g., logging, initializing game state)
  },
  onUserJoined: (roomId, userId) => {
    console.log(`User ${userId} joined room ${roomId}`);
    // Custom logic here (e.g., updating user stats)
  },
  onUserLeft: (roomId, userId) => {
    console.log(`User ${userId} left room ${roomId}`);
    // Custom logic here (e.g., saving game progress)
  },
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
