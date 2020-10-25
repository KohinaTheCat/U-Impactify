const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: "title is required",
  },
  students: {
    type: [String],
  },
  teachers: {
    type: [String],
  },
  description: {
    type: String,
    required: "description is required",
  },
  tags: {
    type: String,
  },
  level: {
    type: String,
    required: "level is required",
  },
  files: {
    type: [String],
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
