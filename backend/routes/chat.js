const Chat = require("../models/chat.model");

module.exports.listen = (server) => {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
      console.log("a user is connected");
      socket.on("message", (message) => console.log(message));
    });
};
