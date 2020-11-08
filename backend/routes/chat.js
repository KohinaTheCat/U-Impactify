const express = require('express');
const router = express.Router();
const chatSchema = require("../models/chat.model");

router.get("/", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

router.post("/new", (req, res) => {
  var message = new chatSchema(req.body);
  message.save((err) => {
    if (err) sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

module.exports = router;