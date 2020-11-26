let userSchema = require("../models/user.model");
let courseSchema = require("../models/course.model");
let opportunitySchema = require("../models/opportunity.model");

const router = require("express").Router();
const multer = require("multer");
const crypto = require("crypto");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const Opportunity = require("../models/opportunity.model");

require("dotenv").config();
const uri = process.env.ATLAS_URI;

const conn = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "user_uploads",
  });
});

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "user_uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage: storage });

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
  const { _id, password, email, type, questionaire } = req.body;
  const newUser = new userSchema({
    _id,
    password,
    email,
    type,
    classesEnrolled: [],
    classesTeaching: [],
    questionaire,
    profile: {
      fullName: "",
      phone: "",
      linkedIn: "",
      facebook: "",
      twitter: "",
    },
    socialInitiative: {
      registeredNumber: "",
      businessNumber: "",
      location: "",
      hours: "",
      phone: "",
      email: "",
    },
    img: "",
    credit: 0,
    chats: [],
    volunteerPosting: [],
    employmentPosting: [],
  });
  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json(err));
});

/**
 * POST uploading profile image for a user
 * @param id user id
 */
router.post("/:id/uploadUserImage", upload.array("document", 1), (req, res) => {
  userSchema
    .findById(req.params.id)
    .then((user) => {
      if (user.img === "") user.img = req.files[0].id;
      else {
        gfs.delete(new mongoose.Types.ObjectId(user.img), (err, data) => {
          if (err) return res.status(404).json({ err: err.message });
        });
        user.img = req.files[0].id;
      }
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error finding Course: ${err}`));
});

/**
 * GET user profile image for a user
 * @param id user id
 * @return user image
 */
router.get("/:id/getUserImage", (req, res) => {
  userSchema
    .findById(req.params.id)
    .then((user) => {
      res.json(user.img);
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * GET file by id
 * @param id file id
 * @return file
 */
router.get("/documents/:id", (req, res) => {
  gfs
    .find({
      _id: mongoose.Types.ObjectId(req.params.id),
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      gfs.openDownloadStream(mongoose.Types.ObjectId(req.params.id)).pipe(res);
    });
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
 * PUT user profile
 * @param _id id of the user
 * @param profile {fullName, phone, linkedIn, facebook, twitter}
 * @return user
 */
router.put("/addProfile", (req, res) => {
  const {_id, profile} = req.body;
  userSchema.findById(_id).then(user => {
    user.profile = profile;
    user.save().then(user => res.json(user)).catch(err => res.status(400).json(err));
  }).catch(err => res.status(404).json(err));
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
 * PUT add new chat id to user
 * @param userId id of user
 * @param chatId id of chat
 * @return user
 */
router.put("/addChat", (req, res) => {
  const { userId, chatId } = req.body;
  userSchema
    .findById(userId)
    .then((user) => {
      user.chats = user.chats.concat(chatId);
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * DELETE any user
 * @TODO CURRENTLY NOT WORKING, FIX AND UPDATE
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

/**
 * Create a new opportunity
 * @return opportunity
 */
router.route("/opportunity").put((req, res) => {
  const {
    recruiter,
    name,
    description,
    type,
    location,
    datePosted,
    dateNeeded,
    salary,
    numberOfHires,
    responsibilites,
    requirements,
    applicants,
  } = req.body;
  const newOpportunity = new Opportunity({
    recruiter,
    name,
    description,
    type,
    location,
    datePosted,
    dateNeeded,
    salary,
    numberOfHires,
    responsibilites,
    requirements,
    applicants,
  });
  newOpportunity
    .save()
    .then((opportunity) => res.json(opportunity))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * PUT new volunteer opportunity with creator
 * @param userId user id
 * @param opportunityId opportunity id
 * @return opportunity
 */
router.put("/addVolunteerOpportunity", (req, res) => {
  const { userId, opportunityId } = req.body;
  userSchema
    .findById(userId)
    .then((user) => {
      user.socialInitiative.volunteerPosting = user.socialInitiative.volunteerPosting.concat(
        opportunityId
      );
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * PUT new employment opportunity with creator
 * @param userId user id
 * @param opportunityId opportunity id
 * @return opportunity
 */
router.put("/addEmploymentOpportunity", (req, res) => {
  const { userId, opportunityId } = req.body;
  userSchema
    .findById(userId)
    .then((user) => {
      user.socialInitiative.employmentPosting = user.socialInitiative.employmentPosting.concat(
        opportunityId
      );
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * GET all volunteer opportunities
 * @return opportunity list
 */
router.get("/opportunity/getVolunteerOpportunities", (req, res) => {
  opportunitySchema
    .find({ type: "volunteer" })
    .then((opp) => {
      res.json(opp);
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * GET all employment opportunities
 * @return opportunity list
 */
router.get("/opportunity/getEmploymentOpportunities", (req, res) => {
  opportunitySchema
    .find({ type: "employment" })
    .then((opp) => {
      res.json(opp);
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * PUT applying to an opportunity
 * @return opportunity
 */
router.put("/opportunity/applyOpportunity", (req, res) => {
  const { opportunityId, applicantUserId } = req.body;
  opportunitySchema
    .findById(opportunityId)
    .then((opp) => {
      opp.applicants = opp.applicants.concat(applicantUserId);
      opp
        .save()
        .then((opp) => res.json(opp))
        .catch((err) => res.status(404).json(err));
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * DELETE opportunity
 * @param id to be deleted opportunity
 */
router.delete("/opportunity/deleteOpportunity/:id", (req, res) => {
  opportunitySchema
    .findByIdAndDelete(req.params.id)
    .then((val) => res.json(val))
    .catch((err) => res.status(400).json(err));
});

/**
 * DELETE remove opportunity from user
 * @param userId userId (type ==== "SI")
 * @param opportunityId id of opportunity
 */
router.delete(
  "/opportunity/removeOpportunity/:userId/:opportunityId",
  (req, res) => {
    userSchema.findById(req.params.userId).then((user) => {
      user.volunteerPosting = user.socialInitiative.volunteerPosting.filter(
        (opp) => opp !== req.params.opportunityId
      );
      user.employmentPosting = user.socialInitiative.employmentPosting.filter(
        (opp) => opp !== req.params.opportunityId
      );
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    });
  }
);

router.put("/opportunity/updateOpportunity", (req, res) => {
  const { opportunity } = req.body;
  opportunitySchema
    .findByIdAndUpdate(opportunity._id, opportunity)
    .then((opp) => res.json(opp))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
