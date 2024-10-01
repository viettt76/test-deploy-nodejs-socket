const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(
  cors({
    // origin: 'http://localhost:3000',
    origin: 'https://viettt76.github.io',
  })
);
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // origin: 'http://localhost:3000',
    origin: 'https://viettt76.github.io',
    withCredentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('socket connection: ', socket.id);
  socket.on('send_message', (data) => {
    io.emit('new_message', data);
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('hey');
});

server.listen(8080, () => {
  console.log('Server listening on 8080');
});
