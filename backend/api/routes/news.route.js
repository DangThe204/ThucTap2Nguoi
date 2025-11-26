// File: news.route.js
import express from 'express';
import multer from 'multer';//Import Multer và cấu hình nơi lưu file
import path from 'path';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js'; // Sửa lại đường dẫn nếu cần
import {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
  getNewsDetail, // Thêm hàm này
} from '../controllers/news.controller.js';

const router = express.Router();
// Cấu hình lưu trữ (Ví dụ: lưu vào thư mục 'uploads')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thay bằng thư mục lưu trữ thật của bạn
  },
 filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage: storage });

// PUBLIC: Lấy tất cả tin tức
router.get('/', getAllNews);

// PUBLIC: Lấy chi tiết tin tức bằng ID (hoặc slug)
// Cần đặt lên trên :id để tránh trùng với các route khác (nhưng ở đây :id là cuối cùng)
router.get('/:id', getNewsDetail); 

// Thêm upload.single('image') để xử lý file trước khi gọi controller
router.post('/', verifyToken, verifyAdmin, upload.single('image'), createNews);
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), updateNews);
router.delete('/:id', verifyToken, verifyAdmin, deleteNews); // Xóa không cần file upload
export default router