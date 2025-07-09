import axios from "axios";
import { getToken, removeToken } from "../utils/AppToken";
const baseURL = `${import.meta.env.VITE_API_URL}/api/`;
const apiClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },

})
export default apiClient;

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            removeToken();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);