const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected!")
})

const Router = require("./routes/main")
app.use("/transactions", Router)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})