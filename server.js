const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log("Client connected");

    ws.on('message', (message, isBinary) => {
        if (isBinary) {
            

        const reader = new FileReader();
        reader.onload = () => {
            console.log(new Uint8Array(reader.result)); // Decoded binary
        };
       
	console.log("Received binary data:", reader.readAsArrayBuffer(event.data));

	//console.log("Received binary data:", new Uint8Array(message));
        // Echo back the binary message
        ws.send(message, { binary: true });

        } else {
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
