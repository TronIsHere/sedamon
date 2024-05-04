const http = require("http");
const server = http.createServer((req: any, res: any) => {
  // Handle HTTP requests if needed
});

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket: any) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("chat message", (message: any) => {
    io.emit("chat message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
