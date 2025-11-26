import express from 'express';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseDetails,
  addSchedule,
} from '../controllers/course.controller.js';

import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// --- Public ---
router.get('/', getAllCourses);
router.get('/:id', getCourseDetails);

// --- Admin protected ---
router.post('/', verifyToken, verifyAdmin, createCourse);
router.put('/:id', verifyToken, verifyAdmin, updateCourse);
router.delete('/:id', verifyToken, verifyAdmin, deleteCourse);

// Thêm lịch học cho lớp học phần (theo TIẾT)
router.post('/:id/schedule', verifyToken, verifyAdmin, addSchedule);

export default router;