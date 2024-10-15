import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";

const CourseCurriculum = () => {
	const {
		courseCurriculumFormData,
		setCourseCurriculumFormData,
		mediaUploadProgress,
		setMediaUploadProgress,
		mediaUploadProgressPercentage,
		setMediaUploadProgressPercentage,
	} = useContext(InstructorContext);

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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create Course Curriculum</CardTitle>
			</CardHeader>
			<CardContent>
				<Button onClick={handleAddLecture}>Add Lecture</Button>
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
								<Input
									type='file'
									accept='video/*'
									className='mb-4'
									onChange={(event) => handleSingleLectureUpload(event, index)}
								/>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default CourseCurriculum;
