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
import ExamSchedule from './pages/ExamSchedule';
import NewsDetailPage from './pages/NewsDetailPage';


// --- Import Admin ---
import AdminCourses from './admin/AdminCourse';
import AdminNews from './admin/AdminNews';
import AdminExams from './admin/AdminExams';

// --- Import Route bảo vệ ---
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* === CÁC ROUTE PUBLIC === */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/NewsPage" element={<NewsPage />} />
            <Route path="/NewsPage/:id" element={<NewsDetailPage />} />
            <Route path="/thoi-khoa-bieu" element={<ThoiKhoaBieu />} />
            <Route path="/lich-thi" element={<ExamSchedule />} />

            {/* === CÁC ROUTE ADMIN (CÓ BẢO VỆ) === */}
            <Route path="/admin/quan-ly-lich-hoc" element={<AdminRoute> <AdminCourses /> </AdminRoute>} />
           <Route path="/admin/quan-ly-lich-thi" element={<AdminExams />} />
            <Route path="/admin/quan-ly-tin-tuc" element={<AdminRoute> <AdminNews /> </AdminRoute>} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<h1>404 - Trang không tồn tại</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
