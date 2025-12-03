import axios from 'axios';

// Thay đổi URL này thành địa chỉ backend của bạn
const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/*
 * Thêm Interceptor để tự động đính kèm Token vào mỗi request
 * khi người dùng đã đăng nhập.
 */
api.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage (giống như cách AuthContext làm)
        const token = localStorage.getItem('token');
        if (token) {
            // Thêm token vào header Authorization
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;