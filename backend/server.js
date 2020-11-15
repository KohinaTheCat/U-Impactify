const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

/* Mongo Connection */

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

const chatRouter = require("./routes/chat");
const courseRouter = require("./routes/course");
const userRouter = require("./routes/user");

app.use("/api/chat", chatRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

connection.once("open", () => {
  console.log("MongoDB connected!");
});

/* Frontend Static files */

app.use(express.static(path.join(__dirname, "..", "frontend", "dist", "uimpactify-app")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "uimpactify-app", "index.html"));
});

/* Express Server */

const server = app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

/* Socket.io Connection */

require("./routes/chat").listen(server);