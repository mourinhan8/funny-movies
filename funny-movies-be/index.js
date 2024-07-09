const dotenv = require("dotenv");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const authSocket = require("./middleware/authSocket");
const envFilePath = path.resolve(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`);
const app = require("./app/app");
dotenv.config({ path: envFilePath });

const PORT = process.env.PORT || 4040;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.use(authSocket);

const ROOM_NAME = "newMovie";

io.on('connection', (socket) => {
  console.log('a user connected');
  const socketId = socket.id;
  io.to(`${socketId}`).emit('userConnected', { message: 'connected' });

  socket.on('join', (data) => {
    console.log(`${socketId} has join notify room`);
    socket.join(ROOM_NAME);
  });

  socket.on('createdMovie', (movie) => {
    socket.to(ROOM_NAME).emit('newMovie', movie);
  });

  socket.on('leave', () => {
    socket.leave(ROOM_NAME);
    console.log(`User ${socket?.userId} has leave notify room`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = server; 
