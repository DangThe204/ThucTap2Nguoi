import express from 'express';
import {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseDetails
} from '../controllers/course.controller.js';

// CẬP NHẬT: Đổi tên import
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';
import { createSchedule } from '../controllers/schedule.controller.js';
import { addSchedule } from "../controllers/course.controller.js";

const router = express.Router();

// --- APIs Public ---
// GET /api/courses (Lấy tất cả Lớp HP).
router.get('/', getAllCourses);
// GET /api/courses/:id (Lấy chi tiết 1 Lớp HP).
router.get('/:id', getCourseDetails);

// --- APIs Admin (Protected) ---
// CẬP NHẬT: Đổi tên sử dụng
// POST /api/courses
router.post('/', verifyToken, verifyAdmin, createCourse);

router.post("/:id/schedule", addSchedule);   // hoặc thêm verifyToken nếu bạn muốn

// PUT /api/courses/:id
router.put('/:id', verifyToken, verifyAdmin, updateCourse);
// DELETE /api/courses/:id
router.delete('/:id', verifyToken, verifyAdmin, deleteCourse);

router.post('/:courseId/schedule', verifyToken, verifyAdmin, createSchedule);

export default router;