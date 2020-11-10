const Chat = require("../models/chat.model");

const onMessagedRecieved = (socket, chat) => {
  const { to, from, message } = chat;
  // store message in database
  const newChat = new Chat(chat);
  newCourse.save().then(() => {
    // emit to the other user
    socket.to(to).emit("message", from, message);
  }).catch(err => console.error(err));
};

module.exports.listen = (server) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    console.log("SOCKET ID", socket.id);
    socket.on("serverconn", (id) => {
      socket.join(id);
    });
    socket.on("message", (chat) => onMessagedRecieved(socket, chat));
  });
};
