const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow requests from any origin
    methods: ["GET", "POST"]
  }
});

// Import and use the WebRTC Socket handlers
require('./src/sockets/rtc.sockets')(io);

// Serve a simple landing page
app.get('/', (req, res) => {
  res.send('WebRTC and Socket.IO service is running.');
});

// Start the server
const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
  console.log(`RTC service running on port ${PORT}`);
});
