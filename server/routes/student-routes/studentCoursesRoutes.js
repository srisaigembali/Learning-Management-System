import express from "express";
import { getCoursesByStudentId } from "../../controllers/student-controller/studentCoursesController.js";

const router = express.Router();

router.get("/get/:studentId", getCoursesByStudentId);

export default router;
