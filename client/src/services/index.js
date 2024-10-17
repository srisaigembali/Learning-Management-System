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

export const addNewCourseService = async (formData) => {
	const { data } = await axiosInstance.post("/instructor/course/add", formData);

	return data;
};

export const updateCourseService = async (id, formData) => {
	const { data } = await axiosInstance.put(`/instructor/course/update/${id}`, formData);

	return data;
};

export const fetchInstructorCourseListService = async () => {
	const { data } = await axiosInstance.get("/instructor/course/get");

	return data;
};

export const fetchInstructorCourseDetailsService = async (id) => {
	const { data } = await axiosInstance.get(`/instructor/course/get/details/${id}`);

	return data;
};

export const mediaBulkUploadService = async (formData, onProgressCallback) => {
	const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
		onUploadProgress: (progressEvent) => {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			onProgressCallback(percentCompleted);
		},
	});

	return data;
};

export const fetchStudentCourseListService = async (query) => {
	const { data } = await axiosInstance.get(`/student/course/get?${query}`);

	return data;
};

export const fetchStudentCourseDetailsService = async (id) => {
	const { data } = await axiosInstance.get(`/student/course/get/details/${id}`);

	return data;
};

export const createPaymentService = async (formData) => {
	const { data } = await axiosInstance.post(`/student/order/create`, formData);

	return data;
};

export const captureAndFinalizePaymentService = async (paymentId, payerId, orderId) => {
	const { data } = await axiosInstance.post(`/student/order/capture`, {
		paymentId,
		payerId,
		orderId,
	});
	return data;
};
