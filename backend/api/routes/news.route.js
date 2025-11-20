import express from 'express';
import {
  layTatCaTin,
  layTinTheoSlug,
  taoTinMoi,
  capNhatTin,
  xoaTin
} from '../controllers/news.controller.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public (ai cũng xem được)
router.get('/', layTatCaTin);
router.get('/:slug', layTinTheoSlug);

// Admin (phải đăng nhập và có quyền admin)
router.post('/', verifyToken, verifyAdmin, taoTinMoi);
router.put('/:id', verifyToken, verifyAdmin, capNhatTin);
router.delete('/:id', verifyToken, verifyAdmin, xoaTin);

export default router;
