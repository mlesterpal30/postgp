import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://localhost:7017/api",
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token"); // get token from localStorage
		if (token) {
			config.headers.Authorization = `Bearer ${token}`; // attach token
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

class APIClient<T> {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = (): Promise<T> => {
		return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
	};

	create = (data: any) => {
		// Log before sending
		console.log("Data being sent:", data);
		return axiosInstance.post(this.endpoint, data).then((res) => res.data);
	};
}

export default APIClient;
