const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message, isBinary) => {
        if (isBinary) {
            console.log('Received binary data:', message);
            // Echo back the binary message
            ws.send(message, { binary: true });
        } else {
            console.log('Received text message:', message.toString());
            // Echo back the text message
            ws.send(`Server received: ${message}`);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
