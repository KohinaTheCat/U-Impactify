const router = require("express").Router();
let userSchema = require("../models/user.model");
let courseSchema = require("../models/course.model");

// POST login user
router.route("/:email").post((req, res) => {
  const { password } = req.body;
  userSchema
    .findOne({
      email: req.params.email,
    })
    .then((user) => {
      user.comparePassword(password, function (err, isMatch) {
        if (err) return res.status(400).json(err);
        return res.json(isMatch ? user : isMatch);
      });
    })
    .catch((err) => res.status(400).json(`Error: User Not Found`));
});

/**
 * POST new user
 * @param req { _id, password, email, type, questionaire }
 * @return user
 */
router.route("/").post((req, res) => {
  const { _id, password, email, type, questionaire, credit} = req.body;
  const newUser = new userSchema({
    _id,
    password,
    email,
    type,
    classesEnrolled: [],
    classesTeaching: [],
    questionaire,
    socialInitiative: {
      registeredNumber: "",
      businessNumber: "",
      location: "",
      hours: "",
      phone: "",
      email: "",
    },
    profileImg: "",
    credit,
    chats: [] 
  });
  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json(err));
});

/**
 * PUT questionnaire response
 * @param req { _id, questionaire }
 * @param _id user id
 * @param questionaire questionaire response
 * @return user
 */
router.route("/addQuestionaire").put((req, res) => {
  const { _id, questionaire } = req.body;
  userSchema.findById(_id).then((user) => {
    user.questionaire = questionaire;
    user
      .save()
      .then(() => res.json(user))
      .catch((err) => res.status(404).json(err));
  });
});

/**
 * PUT enroll course (Impact Learner only)
 * @param req { userId, course }
 * @param userId user id
 * @param course course id
 * @return user
 */
router.route("/enroll").put((req, res) => {
  const { userId, course } = req.body;
  userSchema.findById(userId).then((user) => {
    user.classesEnrolled = user.classesEnrolled.concat(course);
    user
      .save()
      .then(() => res.json(user))
      .catch((err) => res.status(404).json(err));
  });
});

/**
 * PUT update password
 * @param req { _id, password }
 * @param _id user id
 * @param password new password
 * @return user
 */
router.route("/password").put((req, res) => {
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
    .catch((err) => res.status(400).json(err));
});

/**
 * PUT update classesTeaching (Impact Consultant only)
 * @param req { _id, course }
 * @param _id user id
 * @param course course id
 * @return user
 */
router.route("/updateClassesTeaching").put((req, res) => {
  const { _id, course } = req.body;
  userSchema
    .findById(_id)
    .then((user) => {
      user.classesTeaching = user.classesTeaching.concat({
        _id: course._id,
        name: course.name,
      });
      user
        .save()
        .then(() => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(err));
});

/**
 * PUT update credit (user)
 * @param req {_id, credit}
 * @param _id user id
 * @return user 
 */
router.route("/updateCredit").put((req, res) => { 
  const { _id, credit } = req.body; 
  userSchema
    .findById(_id)
    .then((user) => { 
      user.credit = user.credit + Number(credit); 
      user
      .save() 
      .then(() => res.json(user))
      .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(err));
});

/**
 * DELETE drop a course (Impact Learner only)
 * @param req { userId, courseId }
 * @param userId user id
 * @param courseId course id
 * @return user
 */
router.delete("/dropCourse/:courseId/:userId", (req, res) => {
  const { userId, courseId } = req.params;
  userSchema.findById(userId).then((user) => {
    user.classesEnrolled = user.classesEnrolled.filter(
      (enrolled) => courseId !== enrolled._id
    );
    user
      .save()
      .then(() => res.json(user))
      .catch((err) => res.status(400).json(err));
  });
});

/**
 * PUT social initiative
 * @param req const { registeredNumber, businessNumber, location, hours, phone, email,  _id }
 * @return user
 */
router.route("/addSocialInitiativeProfile").put((req, res) => {
  const {
    registeredNumber,
    businessNumber,
    location,
    hours,
    phone,
    email,
    _id,
  } = req.body;
  userSchema.findById(_id).then((user) => {
    user.socialInitiative = {
      registeredNumber,
      businessNumber,
      location,
      hours,
      phone,
      email,
    };
    user
      .save()
      .then(() => res.json(user))
      .catch((err) => res.status(400).json(err));
  });
});


/**
 * GET all Social Initiatives
 * @return all Social Initiatives
 */
router.route("/getAllSI").get((req, res) => {
  userSchema
    .find({ type: "SI" })
    .then((SI) => res.json(SI))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * GET user by id (username)
 * @param id user id
 * @return user
 */
router.route("/:id").get((req, res) => {
  userSchema
    .findById(req.params.id)
    .then((user) => {
      if (user === null) return res.status(404).json("no user found");
      return res.json(user);
    })
    .catch((err) => res.status(404).json("no user found" + err));
});

/**
 * GET users by search query
 * @param query the search query
 * @return array of users that satisfy the query
 *
 * TODO: Replace with filtering in db instead of backend
 */
router.route("/search/:query").get((req, res) => {
  const { query } = req.params;
  userSchema
    .find({
      $or: [
        { _id: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
      ],
    })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(404).json("None Found"));
});

/**
 * DELETE any user
 * @param userId user id
 * @return user
 */
router.delete("/deleteUser/:userId", (req, res) => {
  const { userId } = req.params;
  userSchema
    .findById(userId)
    .then((user) => {
      // impact learner, remove them from every course they're enrolled in
      if (user.type === "IL") {
        user.classesEnrolled.forEach((element) => {
          courseSchema
            .findById(element._id)
            .then((course) => {
              if (!(course.students === null)) {
                course.students = course.students.filter((id) => id !== userId);
              }
              course.save().catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
        });
        // impact consultant, remove them from every course they're teaching
      } else if (user.type === "IC") {
        user.classesTeaching.forEach((teach) => {
          courseSchema
            .findById(teach._id)
            .then((course) => {
              // only teacher in the course, remove the course and un-enroll all students in that course
              if (course.teachers.length === 1) {
                course.students.forEach((element) => {
                  userSchema.findById(element).then((user) => {
                    // remove from coursesEnrolled from student
                    if (!(user.classesEnrolled === null)) {
                      user.classesEnrolled = user.classesEnrolled.filter(
                        (courses) => courses.id !== course.id
                      );
                    }
                    user.save().catch((err) => res.status(400).json(err));
                  });
                });
                // remove the whole course
                courseSchema.findByIdAndRemove(course._id, function (err) {
                  if (!err) {
                    res.status(200).send();
                  } else {
                    return res.status(400).send();
                  }
                });
                // remove single teacher from the course list
              } else {
                if (!(course.teachers === null)) {
                  course.teachers = course.teachers.filter(
                    (id) => id !== userId
                  );
                }
                course.save().catch((err) => res.status(400).json(err));
              }
            })
            .catch((err) => res.status(400).json(err));
        });
      }
    })
    .catch((err) => res.status(400).json("User not found " + err));
  userSchema.findByIdAndRemove(userId, function (err) {
    if (!err) {
      return res.status(200).json(null);
    }
    return res.status(400).send();
  });
});

module.exports = router;
