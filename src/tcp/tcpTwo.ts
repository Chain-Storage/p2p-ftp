// Import the package
import WS from "ws";
// Create a server
const server = new WS.Server({ port: 9000 });
// Listens for connections

server.on("connection", async (socket, req) => {
  // This event handler will be triggered every time somebody send us connections
});
// Get the socket from an address
const socket = new WS("ws://localhost:9000");

// Open a connection
socket.on("open", () => {
  // This event handler will be triggered when a connection is opened
  console.log("Hello world");
});

// Close a connection
socket.on("close", () => {
  // This event handler will be triggered when the connection is closed
  console.log("by by world");
});

// Listens for messages
socket.on("message", (message: string) => {
  // "message" is message, yes

  console.log("by by world " + message);
});
