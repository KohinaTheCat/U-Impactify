const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatSchema = new Schema({
  from: String,
  to: String,
  message: String,
  time: { type: Date, default: Date.now },
});

const Chat = model("Chat", chatSchema);
module.exports = Chat;
