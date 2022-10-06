const uuidv4 = require("uuid").v4;

const messages = new Set();
const rooms = [];
const usersSockets = new Map();

const defaultRoom = "general";

const defaultUser = {
  id: uuidv4(),
  name: "Anonymous",
};

const AVATAR_TYPES = {
  IMAGE_URL: "imageURL",
  VIDEO_URL: "videoURL",
  JSON: "json",
  COLOR: "color",
  NO_AVATAR: "noAvatar",
};

const MESSAGE_TYPES = {
  IMAGE: "image",
  AUDIO: "audio",
  VIDEO: "video",
  TEXT: "text",
  BOT: "bot",
};

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.id = socket.id;
    this.name = "Anonymous";
    this.role = "";
    this.avatar = {
      type: AVATAR_TYPES.NO_AVATAR,
      value: null,
    };

    usersSockets.set(socket, { id: this.id, name: this.name });

    // On connection, send a user-connection event containing user info
    this.sendNewUser(this.id, this.name);

    this.socket.join(defaultRoom);

    socket.on("joinRoom", this.handleJoinRoom.bind(this));
    socket.on("leaveRoom", this.handleLeaveRoom.bind(this));
    socket.on("getRooms", this.getRooms.bind(this));

    socket.on("privateMessage", this.handlePrivateMessage.bind(this));

    socket.on("getUsers", () => this.sendUsers());
    socket.on("setUsername", (name) => this.setUsername(name));

    socket.on("getMessages", () => this.getMessages());
    socket.on("message", (value) => this.handleMessage(value));

    socket.on("setAvatar", (avatar) => this.setAvatar(avatar));

    socket.on("setRole", (role) => this.setRole(role));

    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  getRooms() {
    this.socket.emit("getRooms", rooms);
  }

  handleLeaveRoom(roomName) {
    this.socket.leave(roomName);
  }

  handleJoinRoom(roomName) {
    this.socket.join(roomName);
    rooms.push(roomName);
  }

  handlePrivateMessage(receiverSocketId, message) {
    this.socket
      .to(receiverSocketId)
      .emit("privateMessage", this.socket.id, message);
  }

  setAvatar(avatar) {
    const user = usersSockets.get(this.socket);
    user.avatar = avatar;
    usersSockets.set(this.socket, user);
    this.io.sockets.emit("updateAvatar", user);
  }

  setRole(role) {
    const user = usersSockets.get(this.socket);
    user.role = role;
    usersSockets.set(this.socket, user);
    this.io.sockets.emit("updateRole", user);
  }

  sendUsers() {
    const users = [];
    usersSockets.forEach((value) => users.push(value));
    this.socket.emit("users", users);
  }

  // Used on new client connection
  sendNewUser(id, name) {
    this.io.sockets.emit("userConnection", { id, name });
  }

  // Used on new client disconnection
  sendFormerUser() {
    this.io.sockets.emit("userDisconnection", { id: this.id, name: this.name });
  }

  setUsername(name) {
    const user = usersSockets.get(this.socket);
    const newUser = { ...user, name };
    usersSockets.set(this.socket, newUser);
    this.io.sockets.emit("updateUsername", newUser);
  }

  sendMessage(message, room) {
    if (room) {
      this.io.to(room).emit("message", message);
    } else {
      this.io.to(defaultRoom).emit("message", message);
    }
  }

  getMessages() {
    const msgs = [];
    messages.forEach((message) => msgs.push(message));
    this.socket.emit("messages", msgs);
  }

  /**
   *
   * @param {} message
   * @example {type: MESSAGES_TYPE, value: "mon message", user: "Mon custom name", room: "room_string"}
   */
  handleMessage(clientMsg) {
    let type = null;
    let room = defaultRoom;

    let customUser;
    if (typeof clientMsg === "object") {
      type = clientMsg.type;

      if (type === MESSAGE_TYPES.BOT) {
        customUser = clientMsg.user;
      }

      if (clientMsg.room) {
        room = clientMsg.room;
      }
    }

    const message = {
      id: uuidv4(),
      user: customUser || usersSockets.get(this.socket) || defaultUser,
      value: type === null ? clientMsg : clientMsg.value,
      time: Date.now(),
      room,
      type,
    };

    messages.add(message);
    this.sendMessage(message, room);
  }

  disconnect() {
    usersSockets.delete(this.socket);
    this.sendFormerUser();
  }
}

function chat(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

module.exports = chat;
