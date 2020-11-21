const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
  recruiter: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  location: {
    type: String,
  },
  datePosted: {
    type: Date,
  },
  dateNeeded: {
    type: Date,
  },
  salary: {
    type: Number,
  },
  numberOfHires: {
    type: Number,
  },
  responsibilites: {
    type: [String],
  },
  requirements: {
    type: [String],
  },
  applicants: {
    type: [String],
  },
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;
