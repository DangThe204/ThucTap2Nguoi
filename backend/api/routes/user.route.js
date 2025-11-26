import express from 'express';
import { getStudents } from '../controllers/user.controller.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET /api/users/students (Admin - Protected)
router.get('/students', verifyToken, verifyAdmin, getStudents);

export default router;