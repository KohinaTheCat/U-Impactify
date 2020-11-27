const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Schema for Course
 * @property {String}   name        name of course
 * @property {[String]} students    array of _id's of students
 * @property {[String]} teachers    array of _id's of teachers
 * @property {String}   description desc. of course
 * @property {String}   tags        tags of course
 * @property {String}   level       "ADVANCED", "EASY", "DIFFICULT"
 * @property {[String]} files       Files that would be used in the course (vids, pdfs, etc)
 */
const courseSchema = new Schema({
  name: {
    type: String,
    required: "name is required",
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
  img: {
    type: String,
  },
  files: {
    type: [String],
  },
  assessments: {
    type: [String],
  },
  reviews: {
    type: [
      {
        _id: String,
        courseReview: String,
        score: Number,
        anon: Boolean,
      },
    ],
  },
  lectures: {
    type: [{ _id: String, title: String, date: Date }],
  },
  instructorReview: {
    type: [
      {
        _id: String,
        surveyAnswers: [String],
      },
    ],
  },
  surveyRequest: {
    type: Boolean,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
