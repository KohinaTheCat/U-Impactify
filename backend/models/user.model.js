const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mainSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    classes: {
        // type: [] //string array
    }
})

const Main = mongoose.model('Main', mainSchema);

module.exports = Main;