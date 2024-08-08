const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  },
});

const onlineUser = new Set();

io.on('connection', async(socket) => {
  console.log("connected user", socket.id);

  const token= socket.handshake.auth.token;

  const user = await getUserDetailsFromToken(token);

  socket.join(user?._id);
  onlineUser.add(user?._id);

  io.emit('onlineUser', Array.from(onlineUser));

  socket.on('disconnect', () => {
    onlineUser.delete(user?._id);
    console.log('disconnect user', socket.id);
  });
});

module.exports = {
  app,
  server
};
