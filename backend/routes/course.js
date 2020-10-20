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
//

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

// adding course
router.route("/add").post((req, res) => {
  // add user id to course route
  const title = req.body.title;
  const students = req.body.students;
  const teachers = req.body.teachers;
  const description = req.body.description;
  const files = req.body.files;
  const tags = req.body.tags;
  const level = req.body.level;

  // populate with finalized schema
  const newCourse = new Course({
    title,
    students,
    teachers,
    description,
    files,
    tags,
    level,
  });

  newCourse
    .save()
    .then((r) => res.json(r._id))
    .catch((err) => res.status(400).json("Error: " + err));
});

//GET getting a course, id refers to course id
router.get("/:id", (req, res) => {
  Course.findById(req.params.id)
    .exec()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => res.json(err));
});

// POST add a student to a course, id refers to course id, uid refers to userid
router.post("/addStudent/:id/:uid", (req, res) => {
  Course.findById(req.params.id).then((course) => {
    course.students = course.students.concat(req.params.uid);
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
      course.files = course.files.concat(req.files.map((k) => k.filename));
      course
        .save()
        .then(() => res.json(`Document Added`))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error finding Course: ${err}`));
});

//GET document by filename, filename refers to filename LOL
// TODO: change this to id of document, and then change in user-route
router.get("/documents/:filename", (req, res) => {
  gfs.find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
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
router.get("/document/course/:id", (req, res, next) => {
  Course.findById(req.params.id)
    .select("documents")
    .exec()
    .then((doc) => {
      res.json({
        documents: doc.documents,
      });
    })
    .catch((err) => res.json(err));
});

// GET ALL courses
// TODO: RENAME THIS
router.route("/").get((req, res) => {
  Course.find()
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
