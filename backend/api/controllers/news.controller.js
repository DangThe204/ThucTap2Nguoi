import News from '../models/News.model.js';
import mongoose from 'mongoose';
import fs from 'fs';      
import path from 'path';
// CREATE
export const createNews = async (req, res) => {
  try {
    // Lấy đường dẫn ảnh từ req.file (do Multer thêm vào)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    // Tạo slug từ tiêu đề
    const slug = req.body.tieuDe.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); 
    
    const newNews = new News({
        ...req.body, // Lấy tieuDe, noiDung, tacGia từ FormData
        imageUrl: imageUrl, // Lưu đường dẫn ảnh
        slug: slug,
    });

    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo tin tức', error: err.message });
  }
};

// READ ALL (Lấy tất cả tin tức)
export const getAllNews = async (req, res) => {
  try {
    // Sắp xếp theo ngày tạo mới nhất
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (err) {
    // Lỗi 500 có thể xuất phát từ đây!
    res.status(500).json({ message: 'Lỗi khi lấy danh sách tin tức', error: err.message });
  }
};

// READ ONE (Lấy chi tiết tin tức bằng ID hoặc Slug)
export const getNewsDetail = async (req, res) => {
    try {
        const { id } = req.params;
        let news;

        // Kiểm tra xem params là ObjectId hay là slug
        if (mongoose.Types.ObjectId.isValid(id)) {
            news = await News.findById(id);
        } else {
            news = await News.findOne({ slug: id });
        }
        
        if (!news) {
            return res.status(404).json({ message: 'Không tìm thấy tin tức' });
        }
        res.status(200).json(news);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy chi tiết tin tức', error: err.message });
    }
};
// Hàm hỗ trợ xóa file (bạn có thể định nghĩa nó ở đầu file)
const deleteFileIfExist = (filePath) => {
    // filePath là đường dẫn tương đối (ví dụ: '/uploads/1700000000.png')
    if (filePath) {
        // Cần chuyển đổi đường dẫn tương đối thành đường dẫn tuyệt đối trên server
        // Giả sử 'uploads/' nằm ở thư mục gốc của project backend
        const absolutePath = path.join(process.cwd(), filePath);
        
        // Kiểm tra xem file có tồn tại không
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath); // Xóa file đồng bộ
            console.log(`Đã xóa file: ${absolutePath}`);
        } else {
             console.log(`File không tồn tại: ${absolutePath}`);
        }
    }
};
// UPDATE (Cần lấy tin tức cũ để xóa ảnh cũ)
export const updateNews = async (req, res) => {
  try {
    const oldNews = await News.findById(req.params.id);
    if (!oldNews) {
      return res.status(404).json({ message: 'Không tìm thấy tin tức để cập nhật' });
    }
      
    const updatePayload = { ...req.body };
    
    // Xử lý file mới (nếu có)
    if (req.file) {
        // 1. Xóa ảnh cũ trước khi cập nhật đường dẫn mới
        if (oldNews.imageUrl) {
            deleteFileIfExist(oldNews.imageUrl);
        }
        // 2. Lưu đường dẫn ảnh mới
        updatePayload.imageUrl = `/uploads/${req.file.filename}`;
    }
    if (req.body.tieuDe) {
        // Đảm bảo logic tạo slug giống như trong model (hoặc dùng thư viện slugify)
        updatePayload.slug = req.body.tieuDe.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
    // ... (logic cập nhật slug) ...

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { $set: updatePayload }, 
      { new: true, runValidators: true } 
    );
    res.status(200).json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật tin tức', error: err.message });
  }
};

// DELETE
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    
    if (!news) {
        return res.status(404).json({ message: 'Không tìm thấy tin tức để xóa.' });
    }
    
    // [Cần thêm]: Logic xóa file ảnh khỏi thư mục 'uploads/' nếu có
    
    res.status(200).json({ message: 'Tin tức đã được xóa thành công.' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa tin tức', error: err.message });
  }
};