import express from 'express';
import {
    getMyProfile,
    updateMyProfile,
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfileById
} from '../controllers/profile.controller.js';
// Import 2 "chốt bảo vệ" (code của Bạn [Tên 4])
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// --- API cho Sinh Viên (Đã đăng nhập) ---
// (Dùng cho trang Hồ Sơ Cá Nhân của bạn)
router.get('/me', verifyToken, getMyProfile);
router.put('/me', verifyToken, updateMyProfile);

// --- API cho Admin (Bảo vệ) ---
// (Dùng cho trang Admin Quản lý Hồ sơ)
router.get('/', [verifyToken, verifyAdmin], getAllProfiles);
router.post('/', [verifyToken, verifyAdmin], createProfile);
router.get('/:id', [verifyToken, verifyAdmin], getProfileById);
router.put('/:id', [verifyToken, verifyAdmin], updateProfileById);
// (Chúng ta không làm API Xóa Hồ Sơ, chỉ Xóa User)

export default router;