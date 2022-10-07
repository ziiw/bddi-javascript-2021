const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
// Import our main class
const chat = require("./src/chat");

// Create web server
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://admin.socket.io",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:1234",
      "https://blockchat-space.netlify.app",
    ],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
});

// Listen for new websocket connections
chat(io);

// Start the server
httpServer.listen(process.env.PORT || 3000);
