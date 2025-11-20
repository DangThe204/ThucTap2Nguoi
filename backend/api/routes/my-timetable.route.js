import express from 'express';
import { getMyTimetable } from '../controllers/my-timetable.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET /api/my-timetable (Sinh viên - Protected)
router.get('/', verifyToken, getMyTimetable);

export default router;