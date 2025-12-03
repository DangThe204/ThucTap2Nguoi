import express from 'express';
import { dangKy, dangNhap } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', dangKy);
router.post('/login', dangNhap);

export default router;
