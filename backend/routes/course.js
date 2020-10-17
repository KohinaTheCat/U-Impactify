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

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const fileFiler = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({ storage: storage /*fileFiler: fileFiler*/ });

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// const GridFsStorage = require('multer-gridfs-storage');

// https://stackoverflow.com/questions/13012444/how-to-use-mongodb-or-other-document-database-to-keep-video-files-with-options/13015213

// adding course
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const students = req.body.students;
  const teachers = req.body.teachers;
  const description = req.body.description;

  // populate with finalized schema
  const newCourse = new Course({
    title,
    students,
    teachers,
    description,
    documents: [],
  });

  newCourse
    .save()
    .then(() => res.json("Course added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//getting a course
router.get("/:id", (req, res, next) => {
  Course.findById(req.params.id)
    .exec()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => res.json(err));
});

//uploading document to a course
router.post("/:id/upload", upload.single("document"), (req, res, next) => {
  Course.findById(req.params.id)
    .then((course) => {
      console.log(req.file);
      course.documents = course.documents.concat([req.file.filename]);
      course
        .save()
        .then(() => res.json(`Document Added`))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//get document by filename
router.get("/document/:filename", (req, res) => {
  const file = gfs
    .find({
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

//delete files by id
router.post("/document/del/:id", (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    res.json("document deleted");
  });
});

//getting all the document filenames of a course, :id to course id
router.get("/documents/course/:id", (req, res, next) => {
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

module.exports = router;
