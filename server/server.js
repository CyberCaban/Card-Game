const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require('path');
const { log } = require('console');
let messages = []

app.use(express.static(path.resolve(__dirname, '../client')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

io.on('connection', (socket) => {
  console.log('user connected')

  socket.emit('socket Id', socket.id)
  socket.emit('msg array', messages)

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    if (msg != null) {
      messages.push(msg)
      if (messages.length>=31) {
        messages.splice(0,1)
      }
      socket.emit('msg array', messages)
    }
  });

  socket.on('chat refresh', () => {
    socket.emit('msg array', messages)
  })

  socket.on('join room', roomId => {
    socket.join(roomId)
    socket.emit("room id", roomId)
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});