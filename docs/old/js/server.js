const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Configure CORS for both Express and Socket.IO
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*", // In production, set this to your actual domain
        methods: ["GET", "POST"]
    }
});

// Keep track of rooms and users
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('create-room', (roomId) => {
        socket.join(roomId);
        rooms.set(roomId, { host: socket.id, peers: new Set([socket.id]) });
        socket.emit('room-created', roomId);
        console.log(`Room ${roomId} created by ${socket.id}`);
    });

    socket.on('join-room', (roomId) => {
        const room = rooms.get(roomId);
        if (room) {
            socket.join(roomId);
            room.peers.add(socket.id);
            // Notify the host that someone wants to join
            io.to(room.host).emit('user-joined', { userId: socket.id, roomId });
            socket.emit('room-joined', roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        } else {
            socket.emit('error', 'Room not found');
        }
    });

    socket.on('offer', ({ offer, roomId, toUserId }) => {
        console.log(`Sending offer to ${toUserId} in room ${roomId}`);
        io.to(toUserId).emit('offer', {
            offer,
            fromUserId: socket.id
        });
    });

    socket.on('answer', ({ answer, roomId, toUserId }) => {
        console.log(`Sending answer to ${toUserId} in room ${roomId}`);
        io.to(toUserId).emit('answer', {
            answer,
            fromUserId: socket.id
        });
    });

    socket.on('ice-candidate', ({ candidate, roomId, toUserId }) => {
        console.log(`Sending ICE candidate to ${toUserId} in room ${roomId}`);
        io.to(toUserId).emit('ice-candidate', {
            candidate,
            fromUserId: socket.id
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Clean up rooms
        for (const [roomId, room] of rooms.entries()) {
            if (room.peers.has(socket.id)) {
                room.peers.delete(socket.id);
                // If room is empty, delete it
                if (room.peers.size === 0) {
                    rooms.delete(roomId);
                }
                // Notify others in the room
                io.to(roomId).emit('user-disconnected', socket.id);
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Signaling server running on port ${PORT}`);
});
