// 1. Sabse pehle requirements import karo
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

// 2. Express app banaye
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// 3. Static files serve karne ke liye
app.use(express.static(path.join(__dirname, 'public')));

// 4. Real-time chat logic
io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.on('join', (username) => {
        socket.username = username;
        io.emit('message', { user: 'System', text: `${username} has joined!` });
    });

    socket.on('sendMessage', (message) => {
        io.emit('message', { user: socket.username, text: message });
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            io.emit('message', { user: 'System', text: `${socket.username} has left!` });
        }
    });
});

// 5. Server start karo
// server.js ke last lines change karo
const PORT = 5000; // Ya koi aur number
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});