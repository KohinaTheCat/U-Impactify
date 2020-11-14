const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");

const app = express();

require("dotenv").config();
const uri = process.env.ATLAS_URI;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

/* Mongo Connection */

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

let gfs;
// connecting to db, init. gridstorage and creating a storage
connection.once("open", () => {
  console.log("MongoDB connected!");
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "uploads",
  });
});

var storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

/* Frontend Static files */

app.use(
  express.static(
    path.join(__dirname, "..", "frontend", "dist", "uimpactify-app")
  )
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "frontend",
      "dist",
      "uimpactify-app",
      "index.html"
    )
  );
});

/* Express Server */

const server = app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

/* Socket.io Connection */

const io = require("./routes/chat").listen(server);

module.exports = { gfs, storage };
