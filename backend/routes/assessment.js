const router = require("express").Router();
let userSchema = require("../models/user.model");
let courseSchema = require("../models/course.model");
let Assessment = require("../models/assessment.model");

/**
 * POST new assessment
 * @param req {courseId, studentId, file}
 */
router.post("/:courseId/assessment/create", (req, res) => {});

// Upload student submission to assessment
/**
 * POST student submission to assessment
 * @param req {courseId, assessmentId, studentId, file}
 */
router.post("/:courseId/assessment/:studentId", (req, res) => {});

/**
 * GET all assessments from a course
 * @param req {courseId, assessmentId, studentId, file}
 * @return all assessments in a course
 */
router.post("/getAllAssessments/:courseId", (req, res) => {});

/**
 * GET an assessment with specified courseId and name
 * @param req {courseId, name, studentId, name, file}
 * @return assessment
 */
router.post("/getAssessment/:courseId", (req, res) => {});

module.exports = router;
