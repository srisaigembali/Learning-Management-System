import express from "express";
import {
	getAllStudentCourses,
	getStudentCourseDetails,
} from "../../controllers/student-controller/courseController.js";

const router = express.Router();

router.get("/get", getAllStudentCourses);
router.get("/get/details/:id", getStudentCourseDetails);

export default router;
