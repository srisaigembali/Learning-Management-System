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
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InstructorCourses = ({ listOfCourses }) => {
	const navigate = useNavigate();

	return (
		<Card>
			<CardHeader className='flex justify-between items-center flex-row'>
				<CardTitle className='text-3xl font-extrabold'>All Courses</CardTitle>
				<Button
					className='p-6'
					onClick={() => navigate("/instructor/create-course")}
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
								<TableHead className='text-right'>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{listOfCourses && listOfCourses.length > 0
								? listOfCourses.map((course) => (
										<TableRow key={course?._id}>
											<TableCell className='font-medium'>{course?.title}</TableCell>
											<TableCell>{course?.students?.length}</TableCell>
											<TableCell>$ {course?.pricing}</TableCell>
											<TableCell className='text-right'>
												<Button
													variant='ghost'
													size='sm'
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
