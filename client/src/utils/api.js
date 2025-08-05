import axios from "axios";

// Create axios instance with better defaults for mobile
const api = axios.create({
  baseURL: "https://e-commerce-1-aiq5.onrender.com",
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add any auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);

    // Handle different types of errors
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - please check your internet connection");
    } else if (error.response) {
      // Server responded with error status
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // Network error
      console.error("Network error - please check your internet connection");
    }

    return Promise.reject(error);
  }
);

export default api;
