const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
// app.use(express.static('uploads'))
app.set("view engine", "ejs");
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected!");
});

const courseRouter = require("./routes/course");
const userRouter = require("./routes/user");
const assessmentRouter = require("./routes/assessment");

app.use("/course", courseRouter);
app.use("/user", userRouter);
app.use("/assessment", assessmentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});