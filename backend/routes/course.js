const router = require("express").Router();
let Course = require("../models/course.model");

//connecting to db, init. gridstorage and creating a storage
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const { connect } = require("http2");

var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

// .env
require("dotenv").config();
const uri = process.env.ATLAS_URI;

// connection
const conn = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
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
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage: storage /*fileFiler: fileFiler*/ });

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// const GridFsStorage = require('multer-gridfs-storage');

// https://stackoverflow.com/questions/13012444/how-to-use-mongodb-or-other-document-database-to-keep-video-files-with-options/13015213

// POST new course
router.route("/").post((req, res) => {
  // add user id to course route
  const { name, students, teachers, description, files, tags, level } = req.body;

  // populate with finalized schema
  const newCourse = new Course({
    name,
    students,
    teachers,
    description,
    files,
    tags,
    level,
    "img": "",
  });

  newCourse
    .save()
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET getting a course by id, id refers to course id
router.get("/:id", (req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      res.json(course);    
    })
    .catch((err) => res.status(404).json(err));
});

// POST enroll student
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

//POST uploading document to a course, id refers to course id
router.post("/:id/upload", upload.array("documents", 10), (req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      course.files = course.files.concat(req.files.map((k) => k.id));
      course
        .save()
        .then(() => res.json("Document Added!"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error finding Course: ${err}`));
});

//GET document by filename
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
      gfs
        .openDownloadStream(mongoose.Types.ObjectId(req.params.id))
        .pipe(res);
    });
});

// POST delete files by id, id refers to document id
router.post("/documents/del/:id", (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    res.json("document deleted");
  });
});

// GET all the document filenames of a course, :id to course id
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

// DELETE drop student from course
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

// GET all courses
router.route("/").get((req, res) => {
  Course.find()
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
