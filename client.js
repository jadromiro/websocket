const socket = new WebSocket("ws://localhost:8080");

// Event: Connection opened
socket.onopen = () => {
    console.log("Connected to WebSocket server");
};

// Event: Message received (Handles both text and binary)
socket.onmessage = (event) => {
    const messagesList = document.getElementById("messages");
    const newMessage = document.createElement("li");

    if (typeof event.data === "string") {
        newMessage.textContent = `Server (Text): ${event.data}`;
    } else if (event.data instanceof Blob) {
        event.data.arrayBuffer().then((buffer) => {
            const decoder = new TextDecoder();
            const text = decoder.decode(new Uint8Array(buffer));
            newMessage.textContent = `Server (Binary): ${text}`;
        });  // Fixed the closing parenthesis here
    }

    messagesList.appendChild(newMessage);
};

// Event: Connection closed
socket.onclose = () => {
    console.log("WebSocket connection closed");
};

// Send Text Message
function sendText() {
    const input = document.getElementById("messageInput");
    const message = input.value;
    if (message) {
        socket.send(message);
        input.value = "";
    }
}

// Send Binary Message (ArrayBuffer)
function sendBinary() {
    const input = document.getElementById("messageInput");
    const message = input.value;

    if (message) {
        // Convert the message (text) to binary (ArrayBuffer)
        const encoder = new TextEncoder();
        const binaryData = encoder.encode(message); // Converts text to binary (Uint8Array)

        socket.send(binaryData.buffer); // Send the binary data over WebSocket
        input.value = ""; // Clear the input field
    }
}
