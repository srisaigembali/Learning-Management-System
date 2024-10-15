import cloudinary from "cloudinary";

const cloud = cloudinary.v2;

cloud.config({
	cloud_name: "degjnwiah",
	api_key: "281334551794812",
	api_secret: "xX3iX9ahYRNaa1gHenYaAkR8d3U",
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
