import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const InstructorCourses = ({ listOfCourses }) => {
	const { setCourseLandingFormData, setCourseCurriculumFormData, setCurrentEditedCourseId } =
		useContext(InstructorContext);
	const navigate = useNavigate();

	return (
		<Card>
			<CardHeader className='flex justify-between items-center flex-row'>
				<CardTitle className='text-3xl font-extrabold'>All Courses</CardTitle>
				<Button
					className='p-6'
					onClick={() => {
						setCurrentEditedCourseId(null);
						setCourseLandingFormData(courseLandingInitialFormData);
						setCourseCurriculumFormData(courseCurriculumInitialFormData);
						navigate("/instructor/create-course");
					}}
				>
					Create New Course
				</Button>
			</CardHeader>
			<CardContent>
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Course</TableHead>
								<TableHead>Students</TableHead>
								<TableHead>Revenue</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{listOfCourses && listOfCourses.length > 0
								? listOfCourses.map((course) => (
										<TableRow key={course?._id}>
											<TableCell className='font-medium'>{course?.title}</TableCell>
											<TableCell>{course?.students?.length}</TableCell>
											<TableCell>$ {course?.pricing}</TableCell>
											<TableCell>
												<Button
													variant='ghost'
													size='sm'
													onClick={() => {
														setCurrentEditedCourseId(course?._id);
														navigate(`/instructor/edit-course/${course?._id}`);
													}}
													className='ps-0'
												>
													<Edit className='h-6 w-6' />
												</Button>
												<Button
													variant='ghost'
													size='sm'
												>
													<Delete className='h-6 w-6' />
												</Button>
											</TableCell>
										</TableRow>
								  ))
								: null}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};

export default InstructorCourses;
