const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const saltFactor = 10;

/**
 * Schema for user
 * @property {String}     _id               username of user
 * @property {String}     password          password of user
 * @property {String}     email             email of user
 * @property {String}     type              "IL": Impact Learner, "IC": Impact Consultant, "SI": Social Initiative
 * @property {{Object}}   classesEnrolled   array to store course _id, name, img
 * @property {[Object]}   classesTeaching   array to store course _id, name, img
 * @property {[[String]]} questionaire      for the user questionnaire
 * @property {Object}     socialInitiative  for SI Profile
 *
 */
const userSchema = new Schema({
  _id: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: "password is required",
  },
  email: {
    type: String,
    trim: true,
    required: "email is required",
    unique: "email already registered",
    match: [/.+\@.+\..+/, "Valid email required"],
  },
  type: {
    type: String,
    trim: true,
    required: "Specify Type of User",
  },
  classesEnrolled: {
    type: [
      {
        _id: String,
        name: String,
      },
    ],
  },
  classesTeaching: {
    type: [
      {
        _id: String,
        name: String,
      },
    ],
  },
  questionaire: {
    type: [[String]],
  },

  socialInitiative: {
    registeredNumber: {
      type: String,
    },
    businessNumber: {
      type: String,
    },
    location: {
      type: String,
    },
    hours: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
});

/**
 * https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 *
 * @param {String}   newPass  the new password
 * @param {function} callBack any function you pass, err passed for error handling
 */
userSchema.methods.comparePassword = function (newPass, callBack) {
  bcrypt.compare(newPass, this.password, function (err, isMatch) {
    if (err) return callBack(err);

    // err is null here since compare didn't throw an err
    callBack(null, isMatch);
  });
};
//
userSchema.pre("save", function (next) {
  let user = this;

  // check if password was modified or not
  if (!user.isModified("password")) return next();

  // generate the hash and store password
  bcrypt.hash(user.password, saltFactor, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

const User = model("User", userSchema);
module.exports = User;
