import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = JSON.parse(sessionStorage.getItem("accessToken")) || "";

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(err) => Promise.reject(err)
);

export default axiosInstance;
