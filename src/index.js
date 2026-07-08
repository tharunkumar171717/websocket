import express from 'express';
import { WebSocketServer } from 'ws';

const port = process.env.PORT || 8000;
const app = express();

const users = [
  { id: 1, name: 'tharun', email: 'tharun@email.com' },
];

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

  socket.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());

      if (message.type !== 'GET_USER') {
        socket.send(JSON.stringify({ success: false, type: 'ERROR' }));
        return;
      }

      const user = users.filter((item) => item.name === message.user);

      socket.send(JSON.stringify({
        success: user.length > 0,
        type: 'GET_USER_RESPONSE',
        data: user.length > 0 ? user : 'not found',
      }));
    } catch {
      socket.send(JSON.stringify({ success: false, type: 'ERROR' }));
    }
  });

  socket.on('close', () => console.log('Client disconnected'));
});
