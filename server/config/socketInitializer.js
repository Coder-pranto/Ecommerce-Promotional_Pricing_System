const socketIo = require('socket.io');

let io;

function initializeSocketIO(server) {
  // Initialize Socket.IO server
  io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3004',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    },
  });
  

  // Socket.IO event handler
  io.on('connection', (socket) => {
    console.log('Client connected');

    // socket.on('newOrder', (data) => {
    //   console.log('New order received:', data.order);
    // });
  });

  return io; // Return io instance
}

function getIO() {
  if (!io) {
    throw new Error('Socket.IO has not been initialized.');
  }
  return io;
}

module.exports = { initializeSocketIO, getIO };
