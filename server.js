const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log("Client connected");

    ws.on('message', (message, isBinary) => {
        if (isBinary) {
            

    if (message.data instanceof Blob) {
        message.data.arrayBuffer().then((buffer) => {
            const decoder = new TextDecoder();
            const text = decoder.decode(new Uint8Array(buffer));
	
	console.log("Received binary data:", reader.readAsArrayBuffer(event.data));        
	console.log("Decoded binary data:", text);

	//console.log("Received binary data:", new Uint8Array(message));
        // Echo back the binary message
        ws.send(text, { binary: false });

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
