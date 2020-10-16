const router = require("express").Router();
let userSchema = require("../models/user.model");

// POST login user
router.route("/:id").post((req, res) => {
  const { password } = req.body;
  console.log(req.params.id);
  userSchema.findById(req.params.id)
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
  });
  newUser
    .save()
    .then(() => res.json({
      id: newUser._id
    }))
    .catch((err) => res.status(400).json(err));
});

// POST update password
router.route("/password/:id").post((req, res) => {
  userSchema.findById(req.params.id).then((user) => {
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
  userSchema.findById(req.params.id)
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
  userSchema.findById(req.params.id)
    .then(() => res.json(`User Deleted`))
    .catch((err) => res.json(err));
});

module.exports = router;