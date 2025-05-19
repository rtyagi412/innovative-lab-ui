import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.url.includes("/auth")) {
      const token = localStorage.getItem("access_token"); // Or sessionStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration, logging, etc.
    if (error.response?.status === 401) {
      console.warn("Unauthorized access - maybe token expired");
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
