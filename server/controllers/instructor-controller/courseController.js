import Course from "../../models/Course.js";

export const addNewCourse = async (req, res) => {
	try {
		const courseData = req.body;
		const newCourse = new Course(courseData);
		const saveCourse = await newCourse.save();

		if (saveCourse) {
			res.status(201).json({
				success: true,
				message: "Course created successfully!",
				data: saveCourse,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Some error occured!",
		});
	}
};

export const getAllCourses = async (req, res) => {
	try {
		const coursesList = await Course.find({});
		res.status(200).json({
			success: true,
			data: coursesList,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Some error occured!",
		});
	}
};

export const getCourseDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const courseDetails = await Course.findById(id);

		if (!courseDetails) {
			return res.status(404).json({
				success: false,
				message: "Course not found!",
			});
		}
		res.status(200).json({
			success: true,
			data: courseDetails,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Some error occured!",
		});
	}
};

export const updateCourseById = async (req, res) => {
	try {
		const { id } = req.params;
		const updateCourseData = req.body;

		const updateCourse = await Course.findByIdAndUpdate(id, updateCourseData, { new: true });

		if (!updateCourse) {
			return res.status(404).json({
				success: false,
				message: "Course not found!",
			});
		}

		res.status(200).json({
			success: true,
			message: "Course updated successfully!",
			data: updateCourse,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Some error occured!",
		});
	}
};
