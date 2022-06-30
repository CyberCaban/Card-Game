const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require('path');
const { log } = require('console');

app.use(express.static(path.resolve(__dirname, '../client')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
});
io.on('chat message', (msg) => {
  console.log(msg);
  io.emit('chat message', msg);
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

server.listen(3001, () => {
  console.log('listening on *:3001');
});