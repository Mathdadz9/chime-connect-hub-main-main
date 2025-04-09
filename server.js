// signaling-server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ Em produção, troque por um domínio específico
    methods: ["GET", "POST"]
  }
});

// Mapeia as conexões dos usuários
io.on('connection', socket => {
  console.log('Novo cliente conectado:', socket.id);

  // Repassa mensagens de sinalização (offer, answer, candidate)
  socket.on('signal', (data) => {
    console.log('Sinal recebido de', socket.id, 'para', data.to);
    io.to(data.to).emit('signal', {
      from: socket.id,
      signal: data.signal
    });
  });

  // Permite que os usuários obtenham uma lista de conexões ativas
  socket.on('get-users', () => {
    const clients = Array.from(io.sockets.sockets.keys());
    socket.emit('users', clients.filter(id => id !== socket.id));
  });

  // Encaminha mensagem para desconectar usuários
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor de sinalização rodando em http://localhost:${PORT}`);
});
