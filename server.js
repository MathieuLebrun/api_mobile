const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'UPDATE', 'DELETE']
  }
});

const PORT = process.env.PORT || 3000; 
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const messageRouter = require('./routes/messages');
const commentaireRouter = require('./routes/commentaires');
const conversationsRouter = require('./routes/conversations');

// Increase payload limit
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', messageRouter);
app.use('/api', commentaireRouter);
app.use('/api', conversationsRouter);

// Serve static files
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  // Emit a welcome message to the client
  //socket.emit('message', 'Welcome to the WebSocket server');
  
  // Join a conversation
  socket.on('joinRoom', ({ userId, conversationId }) => {
    socket.join(conversationId);
    socket.conversationId = conversationId; // Enregistrez la salle pour chaque socket connecté
    console.log(`${userId} joined room: ${conversationId}`);
  });

  // Receive message
  socket.on('sendMessage', ({ userId, conversationId, message }) => {
    if (socket.conversationId === conversationId) { // Vérifiez que l'utilisateur appartient bien à la conversation
      console.log(`id: ${userId}, idmessage: ${conversationId}, message: ${message}`);
      io.to(conversationId).emit('message', { userId, conversationId, message });
    } else {
      console.error(`User ${userId} attempted to send a message to a conversation they are not part of.`);
    }
  });

  // Broadcast video data to others in the room
  socket.on('video data', ({ conversationId, data }) => {
    if (socket.conversationId === conversationId) { // Vérifiez que l'utilisateur appartient bien à la conversation
      socket.to(conversationId).emit('video data', data);
    } else {
      console.error(`User attempted to send video data to a conversation they are not part of.`);
    }
  });


  // Disconnect user
  socket.on('disconnect', () => {
    console.log('User has left');
  });
});

// Start the server
server.listen(PORT, '0.0.0.0', () => { 
   console.log(`Server started on port ${PORT}`);
});

module.exports = app;
