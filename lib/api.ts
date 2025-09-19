import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import { safeLocalStorage } from "./utils/storage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

apiClient.interceptors.request.use(
	(config: CustomInternalAxiosRequestConfig) => {
		const token = safeLocalStorage.getItem("adminAccessToken");
		if (token && config.headers) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error: unknown) => {
		if (!(error instanceof AxiosError)) {
			return Promise.reject(error);
		}
		const originalRequest = error.config as CustomInternalAxiosRequestConfig;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				// Try to refresh token
				// ...token refresh logic here...
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default apiClient;
