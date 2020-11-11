const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/**
 * Schema for Chat
 * @property {[String]} members   members of the chat (at least 2)
 * @property {[Object]} messages  contain sender, message, and time
 * {
    from: String,
    body: String,
    time: Date,
   }
 */
const chatSchema = new Schema({
  members: [String],
  messages: [Object],
});

const Chat = model("Chat", chatSchema);
module.exports = Chat;
