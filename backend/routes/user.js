const router = require("express").Router();
let userSchema = require("../models/user.model");

// POST login user
router.route("/:id").post((req, res) => {
  const { password } = req.body;
  userSchema
    .findById(req.params.id)
    .then((user) => {
      user.comparePassword(password, function (err, isMatch) {
        if (err) return res.status(400).json(`${err}`);
        return res.json(isMatch ? user : isMatch);
      });
    })
    .catch((err) => res.status(400).json(`Error: User Not Found`));
});

// POST new user
router.route("/").post((req, res) => {
  const { _id, password, email, type, questionaire } = req.body;
  const newUser = new userSchema({
    _id,
    password,
    email,
    type,
    classesEnrolled: [],
    classesTeaching: [],
    questionaire,
  });
  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json(err));
});

// POST enroll course (Impact Learner only)
router.route("/enroll").post((req, res) => {
  const { _id: userId, courseId: _id, courseName: name } = req.body;
  userSchema.findById(userId).then((user) => {
    user.classesEnrolled = user.classesEnrolled.concat({ _id, name });
    user
      .save()
      .then(() => res.json("Course Added Successfully"))
      .catch((err) => res.status(404).json(err));
  });
});

// POST update password
router.route("/password").post((req, res) => {
  const { _id, password } = req.body;
  userSchema
    .findById(_id)
    .then((user) => {
      user.password = password;
      user
        .save()
        .then(() => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// PUT update classesTeaching (Impact Consultant only)
router.route("/updateClassesTeaching").put((req, res) => {
  const { _id, course } = req.body;
  userSchema
    .findById(_id)
    .then((user) => {
      user.classesTeaching = user.classesTeaching.concat({
        _id: course._id,
        name: course.name,
        img: "#", // placeholder
      });
      user
        .save()
        .then(() => res.json(`User Updated`))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// DELETE drop a course (Impact Learner only)
// course = { _id, name }
router.delete("/dropCourse", (req, res) => {
  const {userId, course} = req.body;
  userSchema.findById(userId).then((user) => {
    user.classesEnrolled = user.classesEnrolled.filter(enrolled => course._id !== enrolled._id);
    user
      .save()
      .then(() => res.json("Course Deleted From Student List!"))
      .catch((err) => res.status(400).json(err));
  });
});

module.exports = router;
