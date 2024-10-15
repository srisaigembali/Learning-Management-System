import axiosInstance from "@/api/axiosInstance";

export const registerUserService = async (formData) => {
	const { data } = await axiosInstance.post("/auth/register", {
		...formData,
		role: "user",
	});

	return data;
};

export const loginUserService = async (formData) => {
	const { data } = await axiosInstance.post("/auth/login", formData);

	return data;
};

export const checkAuthService = async () => {
	const { data } = await axiosInstance.get("/auth/check-auth");

	return data;
};

export const mediaUploadService = async (formData, onProgressCallback) => {
	const { data } = await axiosInstance.post("/media/upload", formData, {
		onUploadProgress: (progressEvent) => {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			onProgressCallback(percentCompleted);
		},
	});

	return data;
};

export const mediaDeleteService = async (id) => {
	const { data } = await axiosInstance.delete(`/media/delete/${id}`);

	return data;
};
