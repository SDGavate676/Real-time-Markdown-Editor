const express = require('express');
const WebSocket = require('ws');
const marked = require('marked');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
  console.log('A user connected');
  
  ws.on('message', (message) => {
    console.log('Received:', message);
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A user disconnected');
  });
});
