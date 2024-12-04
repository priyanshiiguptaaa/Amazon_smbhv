import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// For development, using a mock token
const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJpYXQiOjE2MjM0NTY3ODl9';

export const getAuthToken = () => {
    // In production, this would get the token from localStorage or a secure cookie
    return MOCK_TOKEN;
};

export const setAuthToken = (token) => {
    // In production, this would store the token in localStorage or a secure cookie
    console.log('Token stored:', token);
};

// Create an axios instance with default config
export const axiosWithAuth = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
axiosWithAuth.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle auth errors
axiosWithAuth.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            console.error('Authentication required');
        }
        return Promise.reject(error);
    }
);

export default axiosWithAuth;
