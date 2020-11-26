const router = require("express").Router();
const Chat = require("../models/chat.model");

/**
 * Handler for when a message is sent from client to server
 * @param {Socket} socket the socket from socket.io
 * @param {Object} chat contains sender, reciever, and message body
 */
const onMessagedRecieved = (socket, chatId, message) => {
  Chat.findById(chatId).then(chat => {
    chat.messages = chat.messages.concat(message);
    const to = chat.members.filter(member => member !== message.from)[0];
    chat.save().then(() => socket.to(to).emit("message", chatId, message)).catch(err => console.error(err));
  }).catch(err => console.error(err));
};

/**
   * GET find by members
   * @param from mesasge sender
   * @param to message reciever
   */
router.route("/find/:from/:to").get((req, res) => {
  Chat.find().then(chats => {
    const shared = chats.filter(chat => chat.members.includes(req.params.from) && chat.members.includes(req.params.to));
    if(shared.length)
      res.json(shared[0]);
    else
      res.status(404).json(`Not Found`); 
  }).catch(err => res.status(400).json(err));
});

/**
 * GET chat by id
 * @param {String} id chatId
 */
router.route("/:id").get((req, res) => {
  Chat.findById(req.params.id)
    .then((chat) => res.json(chat))
    .catch((err) => res.status(404).json(err));
});

/**
 * POST new chat
 * @param {String} from message sender
 * @param {String} to   message reciever
 */
router.route("/").post((req, res) => {
  const { from, to } = req.body;
  const chat = new Chat({ members: [from, to], messages: [] });
  chat.save().then(chat => res.json(chat)).catch(err => res.status(500).json(err));
});

module.exports = router;

module.exports.listen = (server) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    // When a user is connected, they join a room with name=user._id
    socket.on("serverconn", (id) => {
      socket.join(id);
    });
    socket.on("message", (chatId, message) => onMessagedRecieved(socket, chatId, message));
  });
};
