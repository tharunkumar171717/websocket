import { websocketRoutes } from '../routes/websocket.routes.js';

export function handleWebSocketMessage(socket, rawMessage) {
  try {
    const message = JSON.parse(rawMessage.toString());
    const service = websocketRoutes[message.type];

    if (!service) {
      throw new Error('Route not found');
    }

    const result = service(message);

    socket.send(JSON.stringify({
      ...result,
      type: `${message.type}_RESPONSE`,
    }));
  } catch (error) {
    socket.send(JSON.stringify({
      success: false,
      type: 'ERROR',
      message: error.message,
    }));
  }
}
