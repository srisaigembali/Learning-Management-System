import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
	title: String,
	videoUrl: String,
	public_id: String,
	freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
	instructorId: String,
	instructorName: String,
	date: Date,
	title: String,
	category: String,
	level: String,
	primaryLanguage: String,
	subtitle: String,
	description: String,
	pricing: Number,
	image: String,
	welcomeMessage: String,
	objectives: String,
	students: [
		{
			studentId: String,
			studentName: String,
			studentEmain: String,
		},
	],
	curriculum: [LectureSchema],
	isPublished: Boolean,
});

export default mongoose.model("Course", CourseSchema);
