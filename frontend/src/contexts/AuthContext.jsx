import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Đọc state từ localStorage ngay khi tải
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            return null;
        }
    });

    // Tự động lưu vào localStorage khi state thay đổi
    useEffect(() => {
        if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }, [token, user]);

    const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', {
            username,
            password,
        });

        const { token, nguoiDung } = response.data;

        // Lưu vào state
        setToken(token);
        setUser(nguoiDung);

        // LƯU ROLE
        localStorage.setItem("role", nguoiDung.role.toLowerCase().trim());

        // LƯU USER + TOKEN
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(nguoiDung));

        return response.data;

    } catch (error) {
        const errorMessage = error.response?.data?.thongBao || "Đăng nhập thất bại";
        console.error('Đăng nhập thất bại:', errorMessage);
        throw new Error(errorMessage);
    }
};

    // Hàm Logout
    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook để dễ gọi
export const useAuth = () => {
    return useContext(AuthContext);
};