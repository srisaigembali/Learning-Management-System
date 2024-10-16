import express from "express";
import {
	addNewCourse,
	getAllCourses,
	getCourseDetails,
	updateCourseById,
} from "../../controllers/courseController";

const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetails);
router.put("/update/:id", updateCourseById);

export default router;
