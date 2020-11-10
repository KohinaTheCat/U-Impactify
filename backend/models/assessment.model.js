const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Schema for Course
 * @property {String}               courseId            id of course that the assessment belongs to
 * @property {String}               name                name of the assessment
 * @property {String}               file                the file that would contain the assessment
 * @property {[[String, String]]}   StudentSubmissions  files that the students have submitted
 *
 * courseId, name are the primary keys for this collection
 * studentSubmissions is an array of tuples that contain the studentId and the file they submitted
 * 
 * 
 **/

const courseSchema = new Schema({
    courseId: {
      type: String,
    },
    file: {
      type: String,
    },
    studentSubmissions: {
      type: [(String, String)],
    },
  });

const Assessment = model("Assessment", assessmentSchema);