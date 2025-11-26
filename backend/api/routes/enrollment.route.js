import express from 'express';
import {
    createEnrollment,
    deleteEnrollment,
    getEnrollmentsByCourse
} from '../controllers/enrollment.controller.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Áp dụng middleware bảo vệ cho TẤT CẢ routes trong file này
router.use(verifyToken, verifyAdmin);

// POST /api/enrollments
router.post('/', createEnrollment);
// DELETE /api/enrollments/:id
router.delete('/:id', deleteEnrollment);
// GET /api/enrollments/by-course/:courseId
router.get('/by-course/:courseId', getEnrollmentsByCourse);

export default router;