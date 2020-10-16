const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
  },
  students: {
    type: [String],
  },
  teachers: {
    type: [String],
  },
  description: {
    type: String,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
