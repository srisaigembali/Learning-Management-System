import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/CourseCurriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/CourseLanding";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/CourseSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import {
	addNewCourseService,
	fetchInstructorCourseDetailsService,
	updateCourseService,
} from "@/services";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddNewCoursePage = () => {
	const {
		courseLandingFormData,
		courseCurriculumFormData,
		setCourseLandingFormData,
		setCourseCurriculumFormData,
		currentEditedCourseId,
		setCurrentEditedCourseId,
	} = useContext(InstructorContext);
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();
	const params = useParams();

	const isEmpty = (value) => {
		if (Array.isArray(value)) {
			return value.length === 0;
		}
		return value === "" || value === null || value === undefined;
	};

	const validateFormData = () => {
		for (const key in courseLandingFormData) {
			if (isEmpty(courseLandingFormData[key])) {
				return false;
			}
		}

		let hasFreeReview = false;

		for (const item of courseCurriculumFormData) {
			if (isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)) {
				return false;
			}
			if (item.freePreview) {
				hasFreeReview = true;
			}
		}
		return hasFreeReview;
	};

	const handleCreateCourse = async () => {
		const courseFinalFormData = {
			instructorId: auth?.user?._id,
			instructorName: auth?.user?.username,
			date: new Date(),
			...courseLandingFormData,
			students: [],
			curriculum: courseCurriculumFormData,
			isPublished: true,
		};

		const response =
			currentEditedCourseId !== null && currentEditedCourseId !== undefined
				? await updateCourseService(currentEditedCourseId, courseFinalFormData)
				: await addNewCourseService(courseFinalFormData);
		if (response?.success) {
			setCourseLandingFormData(courseLandingInitialFormData);
			setCourseCurriculumFormData(courseCurriculumInitialFormData);
			setCurrentEditedCourseId(null);
			navigate(-1);
		}
	};

	const fetchCurrentCourseDetails = async () => {
		const response = await fetchInstructorCourseDetailsService(currentEditedCourseId);
		if (response?.success) {
			const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc, key) => {
				acc[key] = response?.data[key] || courseLandingInitialFormData[key];
				return acc;
			}, {});

			setCourseLandingFormData(setCourseFormData);
			setCourseCurriculumFormData(response?.data?.curriculum);
		}
	};

	useEffect(() => {
		if (currentEditedCourseId) {
			fetchCurrentCourseDetails();
		}
	}, [currentEditedCourseId]);

	useEffect(() => {
		if (params) {
			setCurrentEditedCourseId(params?.courseId);
		}
	}, [params?.courseId]);

	return (
		<div className='container mx-auto p-4'>
			<div className='flex justify-between'>
				<h1 className='text-3xl font-extrabold mb-5'>Create a new course</h1>
				<Button
					disabled={!validateFormData()}
					className='text-sm tracking-wider font-bold px-8'
					onClick={handleCreateCourse}
				>
					SUBMIT
				</Button>
			</div>
			<Card>
				<CardContent>
					<div className='container mx-auto p-4'>
						<Tabs
							defaultValue='curriculum'
							className='space-y-4'
						>
							<TabsList>
								<TabsTrigger value='curriculum'>Curriculum</TabsTrigger>
								<TabsTrigger value='course-landing-page'>Course Landing Page</TabsTrigger>
								<TabsTrigger value='settings'>Settings</TabsTrigger>
							</TabsList>
							<TabsContent value='curriculum'>
								<CourseCurriculum />
							</TabsContent>
							<TabsContent value='course-landing-page'>
								<CourseLanding />
							</TabsContent>
							<TabsContent value='settings'>
								<CourseSettings />
							</TabsContent>
						</Tabs>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AddNewCoursePage;
