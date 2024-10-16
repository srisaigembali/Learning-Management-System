import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { mediaDeleteService, mediaUploadService } from "@/services";
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

	const handleReplaceImage = async () => {
		let copyCourseLandingFormData = courseLandingFormData;
		const getCurrentImageUrl = copyCourseLandingFormData?.image;

		const getCurrentImageId = getCurrentImageUrl.split("/")[-1];

		const response = await mediaDeleteService(getCurrentImageId);

		if (response?.success) {
			copyCourseLandingFormData = {
				...copyCourseLandingFormData,
				image: "",
			};
			setCourseLandingFormData(copyCourseLandingFormData);
		}
	};

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
					<>
						<Button
							onClick={() => handleReplaceImage()}
							className='mb-5'
						>
							Replace Image
						</Button>
						<img
							src={courseLandingFormData?.image}
							alt='course-img'
						/>
					</>
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
