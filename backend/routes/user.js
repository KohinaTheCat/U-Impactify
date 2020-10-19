const router = require("express").Router();
let userSchema = require("../models/user.model");

// POST login user
router.route("/:email").post((req, res) => {
  const { password } = req.body;
  userSchema
    .findOne({
      email: req.params.email,
    })
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
  const { username, password, email, type } = req.body;
  const newUser = new userSchema({
    username,
    password,
    email,
    type,
    classesEnrolled: [],
    classesTeaching: [],
  });
  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json(err));
});

// POST update password
router.route("/password/:id").post((req, res) => {
  userSchema
    .findById(req.params.id)
    .then((user) => {
      user.password = req.body.password;
      user
        .save()
        .then(() => res.json(`Password Updated`))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// POST update email
router.route("/email/:id").post((req, res) => {
  userSchema
    .findById(req.params.id)
    .then((user) => {
      user.email = req.body.email;
      user
        .save()
        .then(() => res.json(`Email Updated`))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// DELETE user
router.route("/:id").delete((req, res) => {
  userSchema
    .findById(req.params.id)
    .then(() => res.json(`User Deleted`))
    .catch((err) => res.json(err));
});

// POST update classesTeaching
router.route("/updateClassesTeaching").post((req, res) => {
  userSchema
    .findById(req.body.userId)
    .then((user) => {
      user.classesTeaching.push(req.body.courseId);
      user
        .save()
        .then(() => res.json(`User Updated`))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
