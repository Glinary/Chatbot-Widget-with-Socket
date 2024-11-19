const express = require('express');
const path = require('path');
const http = require('http'); // Required to integrate WebSocket with Express
const { Server } = require('socket.io'); // Socket.IO server

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server); // Initialize WebSocket server

const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Basic API route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Send a response back to all connected clients
        io.emit('response', `Server says: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
