import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaBulkUploadService, mediaDeleteService, mediaUploadService } from "@/services";
import { Upload } from "lucide-react";
import { useContext, useRef } from "react";

const CourseCurriculum = () => {
	const {
		courseCurriculumFormData,
		setCourseCurriculumFormData,
		mediaUploadProgress,
		setMediaUploadProgress,
		mediaUploadProgressPercentage,
		setMediaUploadProgressPercentage,
	} = useContext(InstructorContext);

	const bulkUploadInputRef = useRef(null);

	const handleAddLecture = () => {
		setCourseCurriculumFormData([
			...courseCurriculumFormData,
			{
				...courseCurriculumInitialFormData[0],
			},
		]);
	};

	const handleCourseTitleChange = (event, index) => {
		let copyCourseCurriculumFormData = [...courseCurriculumFormData];
		copyCourseCurriculumFormData[index] = {
			...copyCourseCurriculumFormData[index],
			title: event.target.value,
		};
		setCourseCurriculumFormData(copyCourseCurriculumFormData);
	};

	const handleFreePreviewChange = (value, index) => {
		let copyCourseCurriculumFormData = [...courseCurriculumFormData];
		copyCourseCurriculumFormData[index] = {
			...copyCourseCurriculumFormData[index],
			freePreview: value,
		};
		setCourseCurriculumFormData(copyCourseCurriculumFormData);
	};

	const handleSingleLectureUpload = async (event, index) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			const videoFormData = new FormData();
			videoFormData.append("file", selectedFile);
			try {
				setMediaUploadProgress(true);
				const response = await mediaUploadService(videoFormData, setMediaUploadProgressPercentage);
				if (response.success) {
					let copyCourseCurriculumFormData = [...courseCurriculumFormData];
					copyCourseCurriculumFormData[index] = {
						...copyCourseCurriculumFormData[index],
						videoUrl: response?.data?.url,
						public_id: response?.data?.public_id,
					};
					setCourseCurriculumFormData(copyCourseCurriculumFormData);
					setMediaUploadProgress(false);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleReplaceVideo = async (currentIndex) => {
		let copyCourseCurriculumFormData = [...courseCurriculumFormData];
		const getCurrentVideoPublicId = copyCourseCurriculumFormData[currentIndex]?.public_id;

		const response = await mediaDeleteService(getCurrentVideoPublicId);

		if (response?.success) {
			copyCourseCurriculumFormData[currentIndex] = {
				...copyCourseCurriculumFormData[currentIndex],
				videoUrl: "",
				public_id: "",
			};
			setCourseCurriculumFormData(copyCourseCurriculumFormData);
		}
	};

	const handleDeleteLecture = async (currentIndex) => {
		let copyCourseCurriculumFormData = [...courseCurriculumFormData];
		const getCurrentSelectedVideoPublicId = copyCourseCurriculumFormData[currentIndex]?.public_id;

		const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);

		if (response?.success) {
			copyCourseCurriculumFormData = copyCourseCurriculumFormData.filter(
				(_, index) => index !== currentIndex
			);

			setCourseCurriculumFormData(copyCourseCurriculumFormData);
		}
	};

	const isCourseCurriculumFormDataValid = () => {
		return courseCurriculumFormData.every((item) => {
			return (
				item && typeof item === "object" && item.title.trim() !== "" && item.videoUrl.trim() !== ""
			);
		});
	};

	const handleOpenBulkUploadDialog = () => {
		bulkUploadInputRef.current?.click();
	};

	const areAllCourseCurriculumFormDataObjectsEmpty = (arr) => {
		return arr.every((obj) => {
			return Object.entries(obj).every(([key, value]) => {
				if (typeof value === "boolean") {
					return true;
				}
				return value === "";
			});
		});
	};

	const handleMediaBulkUpload = async (e) => {
		const selectedFiles = Array.from(e.target.files);
		const bulkFormData = new FormData();
		selectedFiles.forEach((fileItem) => bulkFormData.append("files", fileItem));

		try {
			setMediaUploadProgress(true);
			const response = await mediaBulkUploadService(bulkFormData, setMediaUploadProgressPercentage);

			if (response?.success) {
				let copyCourseCurriculumFormData = areAllCourseCurriculumFormDataObjectsEmpty(
					courseCurriculumFormData
				)
					? []
					: [...courseCurriculumFormData];

				copyCourseCurriculumFormData = [
					...copyCourseCurriculumFormData,
					...response?.data.map((item, index) => ({
						videoUrl: item?.url,
						public_id: item?.public_id,
						title: `Lecture ${copyCourseCurriculumFormData.length + index + 1}`,
						freePreview: false,
					})),
				];

				setCourseCurriculumFormData(copyCourseCurriculumFormData);
				setMediaUploadProgress(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card>
			<CardHeader className='flex flex-row justify-between'>
				<CardTitle className='flex flex-col justify-center'>Create Course Curriculum</CardTitle>
				<div>
					<Input
						type='file'
						ref={bulkUploadInputRef}
						accept='video/*'
						multiple
						className='hidden'
						id='bulk-media-upload'
						onChange={handleMediaBulkUpload}
					/>
					<Button
						as='label'
						htmlFor='bulk-media-upload'
						variant='oultine'
						className='cursor-pointer'
						onClick={handleOpenBulkUploadDialog}
					>
						<Upload className='w-4 h-5 mr-2' /> Bulk Upload
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Button
					onClick={handleAddLecture}
					disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
				>
					Add Lecture
				</Button>
				{mediaUploadProgress ? (
					<MediaProgressBar
						isUploading={mediaUploadProgress}
						progress={mediaUploadProgressPercentage}
					/>
				) : null}
				<div className='mt-4 space-y-4'>
					{courseCurriculumFormData.map((curriculumItem, index) => (
						<div
							key={index}
							className='border p-5 rounded-md'
						>
							<div className='flex gap-5 items-center'>
								<h3 className='font-semibold'>Lecture {index + 1}</h3>
								<Input
									name={`title-${index + 1}`}
									placeholder='Enter lecture title'
									className='max-w-96'
									onChange={(event) => handleCourseTitleChange(event, index)}
									value={courseCurriculumFormData[index]?.title}
								/>
								<div className='flex items-center space-x-2'>
									<Switch
										id={`freePreview-${index + 1}`}
										checked={courseCurriculumFormData[index]?.freePreview}
										onCheckedChange={(value) => handleFreePreviewChange(value, index)}
									/>
									<Label htmlFor={`freePreview-${index + 1}`}>Free Preview</Label>
								</div>
							</div>
							<div className='mt-6'>
								{courseCurriculumFormData[index]?.videoUrl ? (
									<div className='flex gap-3'>
										<VideoPlayer
											url={courseCurriculumFormData[index]?.videoUrl}
											width='450px'
											height='200px'
										/>
										<Button onClick={() => handleReplaceVideo(index)}>Replace Video</Button>
										<Button
											className='bg-red-900'
											onClick={() => handleDeleteLecture(index)}
										>
											Delete Lecture
										</Button>
									</div>
								) : (
									<Input
										type='file'
										accept='video/*'
										className='mb-4'
										onChange={(event) => handleSingleLectureUpload(event, index)}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default CourseCurriculum;
