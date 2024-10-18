import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
	checkCoursePurchaseInfoService,
	createPaymentService,
	fetchStudentCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const StudentCourseDetailsPage = () => {
	const {
		loadingState,
		setLoadingState,
		studentCourseDetails,
		setStudentCourseDetails,
		currentCourseDetailsId,
		setCurrentCourseDetailsId,
	} = useContext(StudentContext);
	const { auth } = useContext(AuthContext);
	const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] = useState(null);
	const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
	const [approvalUrl, setApprovalUrl] = useState("");

	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const getIndexOfFreePreviewUrl =
		studentCourseDetails !== null
			? studentCourseDetails?.curriculum?.findIndex((item) => item.freePreview)
			: -1;

	const fetchStudentCourseDetails = async () => {
		const checkCoursePurchaseInfoResponse = await checkCoursePurchaseInfoService(
			currentCourseDetailsId,
			auth?.user?._id
		);

		if (checkCoursePurchaseInfoResponse?.success && checkCoursePurchaseInfoResponse?.data) {
			navigate(`/course-progress/${currentCourseDetailsId}`);
			return;
		}

		const response = await fetchStudentCourseDetailsService(currentCourseDetailsId);

		if (response?.success) {
			setStudentCourseDetails(response?.data);
			setLoadingState(false);
		} else {
			setStudentCourseDetails(null);
			setLoadingState(true);
		}
	};

	const handleSetFreePreview = (getCurrentVideoInfo) => {
		setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
	};

	const handleCreatePayment = async () => {
		const paymentPayload = {
			userId: auth?.user?._id,
			userName: auth?.user?.username,
			userEmail: auth?.user?.email,
			orderStatus: "pending",
			paymentMethod: "paypal",
			paymentStatus: "initiated",
			orderDate: new Date(),
			paymentId: "",
			payerId: "",
			instructorId: studentCourseDetails?.instructorId,
			instructorName: studentCourseDetails?.instructorName,
			courseImage: studentCourseDetails?.image,
			courseTitle: studentCourseDetails?.title,
			courseId: studentCourseDetails?._id,
			coursePricing: studentCourseDetails?.pricing,
		};

		const response = await createPaymentService(paymentPayload);
		if (response?.success) {
			sessionStorage.setItem("currentOrderId", JSON.stringify(response?.data?.orderId));
			setApprovalUrl(response?.data?.approvalUrl);
		}
	};

	useEffect(() => {
		if (id) setCurrentCourseDetailsId(id);
	}, [id]);

	useEffect(() => {
		if (currentCourseDetailsId) {
			fetchStudentCourseDetails();
		}
	}, [currentCourseDetailsId]);

	useEffect(() => {
		if (!location.pathname.includes("course/details")) {
			setStudentCourseDetails(null);
			setCurrentCourseDetailsId(null);
		}
	}, [location.pathname]);

	useEffect(() => {
		if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
	}, [displayCurrentVideoFreePreview]);

	if (approvalUrl !== "") {
		window.location.href = approvalUrl;
	}

	if (loadingState) return <Skeleton />;

	return (
		<div className=' mx-auto p-4'>
			<div className='bg-gray-900 text-white p-8 rounded-t-lg'>
				<h1 className='text-3xl font-bold mb-4'>{studentCourseDetails?.title}</h1>
				<p className='text-xl mb-4'>{studentCourseDetails?.subtitle}</p>
				<div className='flex items-center space-x-4 mt-2 text-sm'>
					<span>Created By {studentCourseDetails?.instructorName}</span>
					<span>Created On {studentCourseDetails?.date.split("T")[0]}</span>
					<span className='flex items-center'>
						<Globe className='mr-1 h-4 w-4' />
						{studentCourseDetails?.primaryLanguage}
					</span>
					<span>
						{studentCourseDetails?.students.length}{" "}
						{studentCourseDetails?.students.length <= 1 ? "Student" : "Students"}
					</span>
				</div>
			</div>
			<div className='flex flex-col md:flex-row gap-8 mt-8'>
				<main className='flex-grow'>
					<Card className='mb-8'>
						<CardHeader>
							<CardTitle>What you'll learn</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
								{studentCourseDetails?.objectives.split(",").map((objective, index) => (
									<li
										key={index}
										className='flex items-start'
									>
										<CheckCircle className='mr-2 h-5 w-5 text-green-500 flex-shrink-0' />
										<span>{objective}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
					<Card className='mb-8'>
						<CardHeader>
							<CardTitle>Course Description</CardTitle>
						</CardHeader>
						<CardContent>{studentCourseDetails?.description}</CardContent>
					</Card>
					<Card className='mb-8'>
						<CardHeader>
							<CardTitle>Course Curriculum</CardTitle>
						</CardHeader>
						<CardContent>
							{studentCourseDetails?.curriculum?.map((curriculumItem, index) => (
								<li
									key={index}
									className={`${
										curriculumItem?.freePreview ? "cursor-pointer" : "cursor-not-allowed"
									} flex items-center mb-4`}
									onClick={
										curriculumItem?.freePreview ? () => handleSetFreePreview(curriculumItem) : null
									}
								>
									{curriculumItem?.freePreview ? (
										<PlayCircle className='mr-2 h-4 w-4' />
									) : (
										<Lock className='mr-2 h-4 w-4' />
									)}
									<span>{curriculumItem?.title}</span>
								</li>
							))}
						</CardContent>
					</Card>
				</main>
				<aside className='w-full md:w-[500px]'>
					<Card className='sticky top-4'>
						<CardContent className='p-6'>
							<div className='aspect-video mb-4 rounded-lg flex items-center justify-center'>
								<VideoPlayer
									url={
										getIndexOfFreePreviewUrl !== -1
											? studentCourseDetails?.curriculum[getIndexOfFreePreviewUrl].videoUrl
											: ""
									}
									width='450px'
									height='200px'
								/>
							</div>
							<div className='mb-4'>
								<span className='text-3xl font-bold'>${studentCourseDetails?.pricing}</span>
							</div>
							<Button
								className='w-full'
								onClick={handleCreatePayment}
							>
								Buy Now
							</Button>
						</CardContent>
					</Card>
				</aside>
			</div>
			<Dialog
				open={showFreePreviewDialog}
				onOpenChange={() => {
					setShowFreePreviewDialog(false);
					setDisplayCurrentVideoFreePreview(null);
				}}
			>
				<DialogContent className='w-[800px]'>
					<DialogHeader>
						<DialogTitle>Course Preview</DialogTitle>
						<DialogDescription />
					</DialogHeader>
					<div className='aspect-video rounded-lg flex items-center justify-center'>
						<VideoPlayer
							url={displayCurrentVideoFreePreview}
							width='450px'
							height='200px'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						{studentCourseDetails?.curriculum
							?.filter((item) => item.freePreview)
							.map((filteredItem) => (
								<p
									key={filteredItem._id}
									onClick={() => handleSetFreePreview(filteredItem)}
									className='cursor-pointer text-[16px] font-medium'
								>
									{filteredItem?.title}
								</p>
							))}
					</div>
					<DialogFooter className='sm:justify-start'>
						<DialogClose asChild>
							<Button
								type='button'
								variant='secondary'
							>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default StudentCourseDetailsPage;
