const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Schema for Assessment
 * @property {String}               courseId            id of course that the assessment belongs to
 * @property {String}               name                name of the assessment
 * @property {[String]}             files               the file that would contain the assessment
 * @property {Boolean}              visibility          boolean if the assessment is visible to students
 * @property {[Object]}             StudentSubmissions  files that the students have submitted
 *
 * courseId, name are the primary keys for this collection
 * studentSubmissions is an array of tuples that contain the studentId and the file they submitted
 **/

const assessmentSchema = new Schema({
    courseId: {
      type: String,
    },
    name: {
      type: String,
      required: "Assessment name is required",
    },
    files: {
      type: [String],
      required: "Files are required",
    },
    visibility: {
      type: Boolean,
      required: "Visible is required",
    },
    studentSubmissions: {
      type: [
        {
          studentId: String,
          files: [String],
        },
      ]
      },
  });

const Assessment = model("Assessment", assessmentSchema);

module.exports = Assessment;