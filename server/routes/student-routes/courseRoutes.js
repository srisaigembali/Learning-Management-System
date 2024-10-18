import express from "express";
import {
	checkCoursePurchaseInfo,
	getAllStudentCourses,
	getStudentCourseDetails,
} from "../../controllers/student-controller/courseController.js";

const router = express.Router();

router.get("/get", getAllStudentCourses);
router.get("/get/details/:id", getStudentCourseDetails);
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);

export default router;
