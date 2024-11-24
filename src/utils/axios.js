import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is due to an invalid/expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;
