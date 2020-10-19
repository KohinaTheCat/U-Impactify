const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: "title is required",
    unique: "title already exists",
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
    unique: "description already exists",
  },
  tags: {
    type: String,
  },
  level: {
    type: String,
    required: "level is required",
    unique: "level already exists",
  },
  files: {
    type: [String],
  }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
