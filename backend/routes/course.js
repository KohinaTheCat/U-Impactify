let Course = require("../models/course.model");
let User = require("../models/user.model");
let assessmentSchema = require("../models/assessment.model");

const router = require("express").Router();
const multer = require("multer");
const crypto = require("crypto");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");

var Grid = require("gridfs-stream");
const Assessment = require("../models/assessment.model");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
Grid.mongo = mongoose.mongo;

// .env
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
    bucketName: "course_uploads",
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
          bucketName: "course_uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage: storage });

/**
 * POST new course
 * @param req { name, students, teachers, description, files, tags, level }
 * @return course
 */
router.route("/").post((req, res) => {
  // add user id to course route
  const {
    name,
    students,
    teachers,
    description,
    files,
    tags,
    level,
  } = req.body;

  // populate with finalized schema
  const newCourse = new Course({
    name,
    students,
    teachers,
    description,
    files,
    tags,
    level,
    assessments: [],
    lectures: [],
    img: "",
  });

  newCourse
    .save()
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * GET course by id
 * @param id: course id
 * @return course
 */
router.get("/:id", (req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      if (!course) return res.status(404).json("Course Not Found");
      res.json(course);
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * POST enroll student
 * @param req {userId, courseId}
 * @param userId user id
 * @param courseId course id
 */
router.put("/enroll", (req, res) => {
  const { userId, courseId } = req.body;
  Course.findById(courseId).then((course) => {
    course.students = course.students.concat(userId);
    course
      .save()
      .then(() => res.json("Student added Successfully!"))
      .catch((err) => res.status(400).json(err));
  });
});

/**
 * DELETE drop student from course
 * @param req {userId, courseId}
 * @param userId user id
 * @param courseId course id
 * @return course
 */
router.delete("/dropCourse/:courseId/:userId", (req, res) => {
  const { userId, courseId } = req.params;
  Course.findById(courseId).then((course) => {
    course.students = course.students.filter((id) => id !== userId);
    course
      .save()
      .then(() => res.json(course))
      .catch((err) => res.status(400).json(err));
  });
});

/**
 * GET all courses
 * @return all courses
 */
router.route("/").get((req, res) => {
  Course.find()
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * GET courses by search query
 * @param query the search query
 * @return array of courses that satisfy the query
 *
 */
router.route("/search/:query").get((req, res) => {
  const { query } = req.params;
  Course.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { teachers: { $regex: query, $options: "i" } },
      { level: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
    ],
  })
    .then((courses) => {
      res.json(courses);
    })
    .catch((err) => res.status(404).json(err));
});

// PUT updates course content given the course id
router.put("/update", (req, res) => {
  Course.findByIdAndUpdate(req.body.course._id, req.body.course, () =>
    res.json(req.body.course)
  ).catch((err) => res.status(404).json(err));
});

/**
 * POST uploading document to a course
 * @param id course id
 */
router.post("/:id/upload", upload.array("documents", 10), (req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      course.files = course.files.concat(req.files.map((k) => k.filename));
      course
        .save()
        .then(() => res.json("Document Added!"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error finding Course: ${err}`));
});

/**
 * POST uploading document to a assessment
 * @param id course id
 */
router.post(
  "/assessment/uploadAssessment/:id",
  upload.array("documents", 10),
  (req, res) => {
    Assessment.findById(req.params.id)
      .then((assessment) => {
        assessment.files = assessment.files.concat(
          req.files.map((file) => {
            return {
              name: file.filename,
              id: file.id,
            };
          })
        );

        assessment
          .save()
          .then(() => res.json("Assessment Document Added!"))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.status(400).json(`Error finding Course: ${err}`));
  }
);

/**
 * POST uploading courseImage to a course
 * @param id course id
 */
router.post(
  "/:id/uploadCourseImage",
  upload.array("document", 1),
  (req, res) => {
    Course.findById(req.params.id)
      .then((course) => {
        if (course.img === "") course.img = req.files[0].id;
        else {
          gfs.delete(new mongoose.Types.ObjectId(course.img), (err, data) => {
            if (err) return res.status(404).json({ err: err.message });
          });
          course.img = req.files[0].id;
        }
        course
          .save()
          .then(() => res.json(course))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.status(400).json(`Error finding Course: ${err}`));
  }
);

/**
 * GET course image id
 * @param id course id
 * @return course image
 */
router.get("/:id/getCourseImage", (req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      res.json(course.img);
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * GET document by id
 * @param id document id
 * @return document
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
 * POST delete files
 * @param id document id
 */
router.post("/documents/del/:id", (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    res.json("document deleted");
  });
});

/**
 * GET all the document filenames of a course
 * @param id course
 */
router.get("/getAllFiles/:id", (req, res, next) => {
  Course.findById(req.params.id)
    .select("files")
    .exec()
    .then((doc) => {
      res.json({
        documents: doc.files,
      });
    })
    .catch((err) => res.json(err));
});

/**
 * PUT review on a course
 *  @param _id the student id
 *  @return course the course
 */
router.put("/addReview/", (req, res) => {
  const { _id, courseReview, score, courseId, anon } = req.body;

  Course.findById(courseId).then((course) => {
    course.reviews = course.reviews.concat({
      _id,
      courseReview,
      score,
      anon,
    });
    course
      .save()
      .then(() => res.json(course))
      .catch((err) => res.status(400).json(err));
  });
});

/**
 * POST new assessment
 * @param req {courseId, studentId, files}
 */
router.route("/assessment").post((req, res) => {
  const { name, files, visibility } = req.body;

  const newAssessment = new Assessment({
    name,
    files,
    visibility,
    studentSubmissions: [],
  });
  newAssessment
    .save()
    .then((assessment) => res.json(assessment))
    .catch((err) => res.status(400).json("Error: " + err));
});

//
router.route("/assessment/addAssessment").put((req, res) => {
  const { courseId, assessmentId } = req.body;
  Course.findById(courseId).then((newCourse) => {
    newCourse.assessments = newCourse.assessments.concat(assessmentId);
    newCourse
      .save()
      .then(() => res.json(newCourse))
      .catch((err) => res.json(err));
  });
});

router.post("/:id/uploadLecture", upload.array("document", 1), (req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      course.lectures = course.lectures.concat([
        { _id: req.files[0].id, title: req.body.title, date: new Date() },
      ]);
      course
        .save()
        .then(() => res.json(course))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error finding Course: ${err}`));
});

/**
 * DELETE remove assessment from course
 * @param req {courseId, assessmentId}
 * @param courseId course id
 * @param assessmentId assessment id
 * @return assessment
 */
router.delete(
  "/assessment/deleteAssessment/:courseId/:assessmentId",
  (req, res) => {
    const { courseId, assessmentId } = req.params;

    Course.findById(courseId).then((newCourse) => {
      newCourse.assessments = newCourse.assessments.filter(
        (id) => id !== assessmentId
      );

      Assessment.findById(assessmentId).then((newAssessment) => {
        if (newAssessment) {
          if (newAssessment.studentSubmissions) {
            for (i = 0; i < newAssessment.studentSubmissions.length; i++) {
              // If that student has files submitted
              if (newAssessment.studentSubmissions[i].files) {
                // Go through each of the files in there and delete them from course_uploads.files
                newAssessment.studentSubmissions[i].files.forEach((file) => {
                  gfs.delete(new mongoose.Types.ObjectId(file.id));
                });
              }
            }
          }
          if (newAssessment.files) {
            for (i = 0; i < newAssessment.files.length; i++) {
              gfs.delete(
                new mongoose.Types.ObjectId(newAssessment.files[i].id)
              );
            }
          }
        }
      });

      assessmentSchema.findByIdAndRemove(assessmentId, function (err) {
        if (!err) {
          newCourse
            .save()
            .then(() => res.json(newCourse))
            .catch((err) => res.status(400).json(err));
        }
      });
    });
  }
);

router.delete("/assessment/deleteFiles/:assessmentId", (req, res) => {
  const { assessmentId } = req.params;

  Assessment.findById(assessmentId).then((newAssess) => {
    newAssess.files.forEach((file) => {
      gfs.delete(new mongoose.Types.ObjectId(file.id));
    });

    newAssess.files = [];

    newAssess
      .save()
      .then(() => res.json(newAssess))
      .catch((err) => res.json(err));
  });
});

router.put(
  "/assessment/updateAssessment/:assessmentId/:name/:visibility",
  upload.array("documents", 10),
  (req, res) => {
    const { assessmentId, name, visibility } = req.params;

    Assessment.findById(assessmentId).then((newAssess) => {
      newAssess.files = newAssess.files.concat(
        req.files.map((file) => {
          return {
            name: file.filename,
            id: file.id,
          };
        })
      );

      newAssess.visibility = visibility;
      newAssess.name = name;

      newAssess
        .save()
        .then(() => res.json(newAssess))
        .catch((err) => res.json(err));
    });
  }
);

// router.put(
//   "/assessment/updateAssessment",
//   upload.array("documents", 10),
//   (req, res) => {
//     const {
//       files,
//       studentSubmissions,
//       name,
//       visibility,
//       assessmentId,
//     } = req.body;

//     Assessment.findById(assessmentId)
//       .then((assessment) => {
//         assessment = {
//           ...assessment,
//           name,
//           visibility,
//           files,
//           studentSubmissions,
//         };
//         assessment
//           .save()
//           .then(() => res.json(assessment))
//           .catch((err) => res.status(400).json("Error: " + err));
//       })
//       .catch((err) => res.status(404).json(err));
//   }
// );

// router.put("/assessment/deleteFiles", (req, res) => {
//   const { assessmentId } = req.body;
//   Assessment.findById(assessmentId).then((assessment) => {
//     if (assessment.files) {
//       for (i = 0; i < assessment.files; i++) {
//         gfs.delete(new mongoose.Types.ObjectId(file.id));
//       }
//     }
//     assessment.files = [];
//     assessment
//       .save()
//       .then(() => res.json(assessment))
//       .catch((err) => res.json(err));
//   });
// });

// Upload student submission to assessment
/**   [ [studentId, fileId[]] ]
 * PUT student submission to assessment
 * @param req {courseId, assessmentId, studentId, files}
 */
router.put(
  "/assessment/addStudentSubmission/:assessmentId/:studentId",
  upload.array("documents", 10),

  (req, res) => {
    const { assessmentId, studentId } = req.params;
    Assessment.findById(assessmentId).then((assessment) => {
      if (!assessment.studentSubmissions) {
        assessment.studentSubmissions = [
          {
            studentId,
            mark: -1,
            files: req.files.map((file) => {
              return {
                id: file.id,
                name: file.filename,
              };
            }),
          },
        ];
      }

      const submissions = assessment.studentSubmissions.filter(
        (sub) => sub.studentId === studentId
      );
      if (submissions.length) {
        const sub =
          assessment.studentSubmissions[
            assessment.studentSubmissions.indexOf(submissions[0])
          ];

        sub.files = sub.files.concat(
          req.files.map((file) => {
            return {
              id: file.id,
              name: file.filename,
            };
          })
        );
      } else {
        assessment.studentSubmissions = assessment.studentSubmissions.concat({
          studentId,
          //not sure if mark has to be neg 1 here
          mark: -1,
          files: req.files.map((file) => {
            return {
              id: file.id,
              name: file.filename,
            };
          }),
        });
      }

      assessment.markModified("studentSubmissions");
      assessment
        .save()
        .then((assessment) => res.json(assessment))
        .catch((err) => res.status(400).json(err));
    });
  }
);

/**
 * PUT update mark by student id and assessment
 * @param req{assessmentId, studentId, mark}
 */
router.put("/assessment/updateMark", (req, res) => {
  const { assessmentId, studentId, mark } = req.body;

  Assessment.findById(assessmentId)
    .then((assessment) => {
      const submissiontemp = assessment.studentSubmissions.filter(
        (submission) => submission.studentId === studentId
      );
      if (submissiontemp.length) {
        assessment.studentSubmissions[
          assessment.studentSubmissions.indexOf(submissiontemp[0])
        ].mark = mark;
        assessment.markModified("studentSubmissions");
        assessment
          .save()
          .then(() => res.json(assessment))
          .catch((err) => res.json(err));
      } else {
        res.status(404).json(`Error: Submission not found`);
      }
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * GET an assessment by id
 * @param assessmentId: assessment id
 * @return assessment
 */

router.get("/assessment/getAssessment/:assessmentId", (req, res) => {
  Assessment.findById(req.body.assessmentId)
    .then((assessment) => {
      if (!assessment) return res.status(404).json("Assessment Not Found");
      return res.json(assessment);
    })
    .catch((err) => res.status(404).json(err));
});

/**
 * GET all assessments from a course
 * @param req {courseId, assessmentId, studentId, file}
 * @return all assessments in a course
 */
router.get("/assessment/getAllAssessments/:courseId", (req, res) => {
  Course.findById(req.params.courseId)
    .then((course) => {
      var assessmentArray = [];

      course.assessments.forEach((assessment) => {
        Assessment.findById(assessment)
          .then((assess) => {
            assessmentArray = assessmentArray.concat(assess);
            if (assessmentArray.length == course.assessments.length) {
              res.json(assessmentArray);
            }
          })
          .catch((err) => res.status(400).json(`Error: ${err}`));
      });
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * GET student submission by studentId
 */
router.get(
  "/assessment/getstudentSubmission/:assessmentId/:studentId",
  (req, res) => {
    Assessment.findById(req.body.assessmentId)
      .then((assessment) => {
        const submission = assessment.studentSubmissions.filter(
          (submission) => submission.studentId === req.params.studentId
        );
        if (submission.length) {
          res.json(submission[0]);
        } else {
          res.status(404).json(`Error: Submission not found`);
        }
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
  }
);

/**
 * GET all student submissions for an assessment
 */
router.get("/assessment/getAllStudentSubmissions/:assessmentId", (req, res) => {
  Assessment.findById(req.body.assessmentId)
    .then((assessment) => {
      if (assessment.studentSubmissions.length) {
        res.json(assessment.studentSubmissions);
      } else {
        res.status(404).json(`Error: Assessment Not Found`);
      }
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
//  * DELETE student submisison
//  */
router.delete(
  "/assessment/deleteStudentSubmission/:assessmentId/:studentId",
  (req, res) => {
    const { assessmentId, studentId } = req.params;
    Assessment.findById(assessmentId).then((newAssessment) => {
      for (i = 0; i < newAssessment.studentSubmissions.length; i++) {
        if (newAssessment.studentSubmissions[i].studentId === studentId) {
          if (newAssessment.studentSubmissions[i].files) {
            newAssessment.studentSubmissions[i].files.forEach((file) => {
              gfs.delete(new mongoose.Types.ObjectId(file.id));
            });
          }

          newAssessment.studentSubmissions[i].files = [];
        }
      }
      // .forEach((node) => {
      //   if (node.studentId === studentId) {
      //     node.files = [];
      //   }
      // ((eachStudent) => eachStudent.studentId !== studentId);

      newAssessment.markModified("studentSubmissions");
      newAssessment
        .save()
        .then(() => res.json(newAssessment))
        .catch((err) => res.status(400).json(err));
    });
  }
);

/**
 * PUT Instructor review on a course
 *  @param _id the student id
 *  @return course the course
 */
router.put("/addSurvey/", (req, res) => {
  const { _id, surveyAnswers, courseId } = req.body;

  Course.findById(courseId).then((course) => {
    course.instructorReview = course.instructorReview.concat({
      _id,
      surveyAnswers,
    });

    course
      .save()
      .then(() => res.json(course))
      .catch((err) => res.status(400).json(err));
  });
});

router.put("/surveyRequest/:id", (req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      course.surveyRequest = true;
      course
        .save()
        .then(() => res.json(course))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(404).json(err));
});

router.put("/bulkUpdateCourseImage", async (req, res) => {
  const { _id, img } = req.body;
  const course = await Course.findById(_id);
  course.teachers.forEach(async (teacherId) => {
    const teacher = await User.findById(teacherId);
    teacher.classesTeaching.forEach((c) => {
      if (c._id === _id) {
        c.img = img;
      }
    });
    await teacher.save();
  });
  course.students.forEach(async (studentId) => {
    const student = await User.findById(studentId);
    student.classesEnrolled.forEach((c) => {
      if (c._id === _id) c.img = img;
    });
    await student.save();
  });
  res.json(course);
});

module.exports = router;
