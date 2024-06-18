import axios from "axios";

// Create an axios instance
export const axiosWithToken = axios.create({
    baseURL: 'http://localhost:4000/', // Adjust this to your API base URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include the token in every request
axiosWithToken.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
