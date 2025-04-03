const ws = new WebSocket('ws://localhost:8080');

// Event: Connection opened
ws.onopen = () => {
    console.log('Connected to server');

    // Send a text message
    ws.send('Hello, Server!');

    // Send a binary message (an ArrayBuffer)
    const binaryData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in ASCII
    ws.send(binaryData.buffer);
};

// Event: Message received
ws.onmessage = (event) => {
    if (typeof event.data === 'string') {
        console.log('Received text:', event.data);
    } else {
        console.log('Received binary data:', new Uint8Array(event.data));
    }
};

// Event: Connection closed
ws.onclose = () => {
    console.log('Connection closed');
};

// Event: Error handling
ws.onerror = (error) => {
    console.error('WebSocket Error:', error);
};
