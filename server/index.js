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
      "http://127.0.0.1:5500",
      "https://meepo-chat.surge.sh",
      "https://xgob23aa.herokuapp.com"
    ],
    credentials: true,
  },
});

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "gobelins2022" // "changeit" encrypted with bcrypt
  },,
});

// Listen for new websocket connections
chat(io);

// Start the server
httpServer.listen(process.env.PORT || 3000);
