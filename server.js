import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Log the IP address of the client
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (rawData) => {
    console.log(rawData);
    const message = rawData.toString();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("Server: " + message);
      }
    });
  });

  socket.on("error", (error) => {
    console.error(`WebSocket error: ${error.message} : ${ip}`);
  });

  socket.on("close", () => {
    console.log(`WebSocket connection closed: ${ip}`);
  });
});

console.log("first")