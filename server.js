const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Serve the frontend files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', (data) => {
    // Broadcast message to everyone else
    socket.broadcast.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
