# WebSocket server

A small Express server with a WebSocket endpoint for looking up users.

## Setup

```bash
npm install
npm run dev
```

The HTTP server runs on port `8000` by default. Set `PORT` to override it.

## Endpoints

- `GET /health` returns the server status.
- `ws://localhost:8000/ws` accepts WebSocket connections.

Send a user lookup message:

```json
{
  "type": "GET_USER",
  "user": "tharun"
}
```
