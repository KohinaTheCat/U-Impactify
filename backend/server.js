const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chatSchema = require("./models/chat.model");

const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  origins: "localhost:4200:* http://localhost:4200:* http://localhost:4200:*",
});

require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

/* Mongoose Connection */

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

const courseRouter = require("./routes/course");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");

app.use("/chat", chatRouter);
app.use("/course", courseRouter);
app.use("/user", userRouter);


app.get("/temp/chat/messages", (req, res) => {
  chatSchema.find()
    .then((chats) => res.json(chats))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.post("/temp/chat/new", (req, res) => {
  var message = new chatSchema(req.body);
  message.save((err) => {
    if (err) sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 5000;

io.on("connection", () => {
  console.log("a user is connected");
});

connection.once("open", () => {
  console.log("MongoDB connected!");
});

const server = app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
