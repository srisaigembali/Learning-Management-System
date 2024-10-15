import cloudinary from "cloudinary";

const cloud = cloudinary.v2;

cloud.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMediaToCloudinary = async (filePath) => {
	try {
		const result = await cloud.uploader.upload(filePath, {
			resource_type: "auto",
		});
		return result;
	} catch (error) {
		console.log(error);
		throw new Error("Error uploading to cloudinary");
	}
};

export const delteMediaFromCloudinary = async (publicId) => {
	try {
		await cloud.uploader.destroy(publicId);
	} catch (error) {
		console.log(error);
		throw new Error("Error deleting from cloudinary");
	}
};
