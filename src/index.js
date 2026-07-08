import express from 'express';
import { WebSocketServer } from 'ws';

import { handleWebSocketMessage } from './services/websocket.service.js';

const port = process.env.PORT || 8000;
const app = express();

app.get('/health', (_request, response) => {
  response.status(200).json({
    status: 'OK',
    websocket: 'Running',
  });
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const websocketServer = new WebSocketServer({ server, path: '/ws' });

websocketServer.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => handleWebSocketMessage(socket, message));

  socket.on('close', () => console.log('Client disconnected'));
});
