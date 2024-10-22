import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
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
