const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log("Client connected");

    ws.on('message', (message, isBinary) => {
        if (isBinary) {
            // If the message is binary, handle it
            const text = new TextDecoder().decode(message);
            console.log("Received binary data:", new Uint8Array(message));
            console.log("Decoded binary data:", text);

            // Echo back the decoded binary data as text
            ws.send(`Echo: ${text}`);
        } else {
            // If the message is text, handle it
            console.log("Received text message:", message.toString());

            // Echo back the text message
            ws.send(`Echo: ${message}`);
        }
    });

    ws.on('close', () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server running on ws://localhost:8080");
