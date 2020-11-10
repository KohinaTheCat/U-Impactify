const router = require("express").Router();
const Chat = require("../models/chat.model");

/**
 * TODO: Update as frontend is developed
 * Handler for when a message is sent from client to server
 * @param {Socket} socket the socket from socket.io
 * @param {Object} chat contains sender, reciever, and message body
 */
const onMessagedRecieved = (socket, chat) => {
  const { to, from, body } = chat;
  Chat.findOne({ members: [from, to] }).then((chat) => {
    if(chat) {
      chat.messages = chat.messages.concat({
        from,
        body,
        time: new Date(),
      });
    } else {
      chat = new Chat({members: [from, to], messages: [{from, body, time: new Date()}]});
    }
    chat.save().then(() => socket.to(to).emit("message", chat));
  });
};

/**
 * GET chat by id
 * @param {String} id chatId
 */
router.route("/:id").get((req, res) => {
  Chat.findById(req.params.id)
    .then((chat) => res.json(chat))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;

module.exports.listen = (server) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    socket.on("serverconn", (id) => {
      socket.join(id);
    });
    socket.on("message", (chat) => onMessagedRecieved(socket, chat));
  });
};
