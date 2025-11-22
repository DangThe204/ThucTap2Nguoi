import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// --- Import Layouts ---
import MainLayout from './layouts/MainLayout';

// --- Import Các Trang Public ---
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import LoginPage from "./pages/LoginPage";
import ThoiKhoaBieu from './pages/ThoiKhoaBieu';
import ExamSchedule from './pages/ExamSchedule/ExamSchedule';
import NewsDetailPage from './pages/NewsDetailPage';
// --- Import Các Trang Admin ---
import AdminCourses from './admin/AdminCourse';
import AdminNews from './admin/AdminNews';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* === CÁC ROUTE PUBLIC (Bọc bằng MainLayout) === */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/NewsPage" element={<NewsPage />} />
            <Route path="/NewsPage/:id" element={<NewsDetailPage />} />
            <Route path="/thoi-khoa-bieu" element={<ThoiKhoaBieu />} />
            <Route path="/lich-thi" element={<ExamSchedule />} />
            
            {/* === CÁC ROUTE ADMIN === */}
            <Route path="/admin/quan-ly-lich-hoc" element={<AdminCourses />} />
            <Route path="/admin/quan-ly-tin-tuc" element={<AdminNews />} />
           
          </Route>
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="*" element={<h1>404 - Trang không tồn tại</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;