import express from "express";
import {
    getExams,
    createExam,
    updateExam,
    deleteExam,
    getPublicExams,
    getExamLopOptions
} from "../controllers/exam.controller.js";

import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/public/lop-options', getExamLopOptions);
router.get('/public', getPublicExams);

// Admin routes
router.get("/", verifyToken, verifyAdmin, getExams);
router.post("/", verifyToken, verifyAdmin, createExam);
router.put("/:id", verifyToken, verifyAdmin, updateExam);
router.delete("/:id", verifyToken, verifyAdmin, deleteExam);

export default router;