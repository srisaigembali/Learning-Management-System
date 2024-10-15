import MediaProgressBar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";

const CourseSettings = () => {
	const {
		courseLandingFormData,
		setCourseLandingFormData,
		mediaUploadProgress,
		setMediaUploadProgress,
		mediaUploadProgressPercentage,
		setMediaUploadProgressPercentage,
	} = useContext(InstructorContext);

	const handleImageUploadChange = async (event) => {
		const selectedImage = event.target.files[0];

		if (selectedImage) {
			const imageFormData = new FormData();
			imageFormData.append("file", selectedImage);

			try {
				setMediaUploadProgress(true);
				const response = await mediaUploadService(imageFormData, setMediaUploadProgressPercentage);
				if (response.success) {
					setCourseLandingFormData({
						...courseLandingFormData,
						image: response.data.url,
					});
				}
				setMediaUploadProgress(false);
			} catch (error) {
				console.log(error);
			}
		}
	};

	console.log(courseLandingFormData);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Course Settings</CardTitle>
			</CardHeader>
			<div className='p-2'>
				{mediaUploadProgress ? (
					<MediaProgressBar
						isUploading={mediaUploadProgress}
						progress={mediaUploadProgressPercentage}
					/>
				) : null}
			</div>
			<CardContent>
				{courseLandingFormData?.image ? (
					<img
						src={courseLandingFormData?.image}
						alt='course-img'
					/>
				) : (
					<div className='flex flex-col gap-3'>
						<Label>Upload Course Image</Label>
						<Input
							type='file'
							accept='image/*'
							className='mb-4 cursor-pointer'
							onChange={(e) => handleImageUploadChange(e)}
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default CourseSettings;
