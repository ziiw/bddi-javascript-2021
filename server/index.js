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
      "http://localhost:5173",
      "http://localhost:3001",
      "http://localhost:1234",
      "https://blockchat-space.netlify.app",
      "http://127.0.0.1:5500",
      "https://meepo-chat.surge.sh",
      "https://xgob23aa.herokuapp.com",
      "https://giga-chat-box.netlify.app",
      "https://galaxy-chat.vercel.app",
      "http://localhost:8000",
      "https://hawkins.surge.sh",
    ],
    credentials: true,
  },
});

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "$2b$10$1Zel63pfSJ5XXpL2es/iPuSeeKuaQMW1xjAQjJeWTbMaHX/LB7b7S", // "changeit" encrypted with bcrypt
  },
});

// Listen for new websocket connections
chat(io);

// Start the server
httpServer.listen(process.env.PORT || 3000);
