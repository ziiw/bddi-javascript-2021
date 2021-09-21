const uuidv4 = require("uuid").v4;

const messages = new Set();
const users = new Map();

const defaultUser = {
  id: uuidv4(),
  name: "Anonymous",
};

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    users.set(socket, defaultUser);

    socket.on("getUsers", () => this.getUsers());
    socket.on("setUsername", (name) => this.setUsername(name));
    socket.on("getMessages", () => this.getMessages());
    socket.on("message", (value) => this.handleMessage(value));
    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  getUsers() {
    users.forEach((user) => this.sendUser(user));
  }

  sendUser(user) {
    this.io.sockets.emit("user", user);
  }

  setUsername(name) {
    users.set(this.socket, { name });
  }

  sendMessage(message) {
    this.io.sockets.emit("message", message);
  }

  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(value) {
    const message = {
      id: uuidv4(),
      user: users.get(this.socket) || defaultUser,
      value,
      time: Date.now(),
    };

    messages.add(message);
    this.sendMessage(message);
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function chat(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

module.exports = chat;
