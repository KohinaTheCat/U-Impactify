const router = require('express').Router();
let Course = require('../models/course.model');

const multer = require('multer')
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// const GridFsStorage = require('multer-gridfs-storage');

// https://stackoverflow.com/questions/13012444/how-to-use-mongodb-or-other-document-database-to-keep-video-files-with-options/13015213

// adding course
router.route('/add').post((req, res) =>{
  const title = req.body.title;
  const students= req.body.students;
  const teachers=req.body.teachers;
  const description=req.body.description;

  // populate with finalized schema
  const newCourse = new Course({
      title,
      students,
      teachers,
      description
  })

  newCourse.save()
  .then(() => res.json('Course added!'))
  .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;