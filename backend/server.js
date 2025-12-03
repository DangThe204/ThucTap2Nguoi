// File: server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Kích hoạt biến môi trường
dotenv.config();

// Tạo app Express

const app = express();

// --- Middleware ---
app.use(cors({
  origin: "http://localhost:5176",
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// --- Import Routes ---
import authRoutes from "../backend/api/routes/auth.route.js";
import newsRoutes from "../backend/api/routes/news.route.js";
import examRoutes from "../backend/api/routes/exam.route.js";
import courseRoutes from './api/routes/course.route.js';
import userRoutes from './api/routes/user.route.js';
import enrollmentRoutes from './api/routes/enrollment.route.js';
import myTimetableRoutes from './api/routes/my-timetable.route.js';
import profileRoutes from './api/routes/profile.route.js';
import path from 'path'; // Cần import 'path'
// --- Gắn Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/my-timetable", myTimetableRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);
app.use('/api/profile', profileRoutes);

// --- Route kiểm tra ---
app.get('/', (req, res) => {
  res.send('API server sườn đang chạy...');
});

// --- Kết nối MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Đã kết nối thành công tới MongoDB!');
  })
  .catch((err) => {
    console.error('Lỗi kết nối MongoDB:', err);
  });

// --- Khởi chạy server ---
const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server sườn đang chạy ở port ${process.env.PORT || 8080}`);
});
