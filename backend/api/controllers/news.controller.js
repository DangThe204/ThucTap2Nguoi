import News from '../models/News.model.js';

// Lấy tất cả tin tức
export const layTatCaTin = async (req, res) => {
  try {
    const tin = await News.find().sort({ createdAt: -1 });
    res.json(tin);
  } catch (loi) {
    res.status(500).json({ thongBao: loi.message });
  }
};

// Lấy tin tức theo slug
export const layTinTheoSlug = async (req, res) => {
  try {
    const tin = await News.findOne({ slug: req.params.slug });
    if (!tin) return res.status(404).json({ thongBao: 'Không tìm thấy tin tức!' });
    res.json(tin);
  } catch (loi) {
    res.status(500).json({ thongBao: loi.message });
  }
};

// Tạo tin mới (Admin)
export const taoTinMoi = async (req, res) => {
  try {
    const tinMoi = new News(req.body);
    await tinMoi.save();
    res.status(201).json(tinMoi);
  } catch (loi) {
    if (loi.code === 11000)
      res.status(400).json({ thongBao: 'Tiêu đề hoặc đường dẫn tin đã tồn tại!' });
    else res.status(500).json({ thongBao: loi.message });
  }
};

// Cập nhật tin
export const capNhatTin = async (req, res) => {
  try {
    const capNhat = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(capNhat);
  } catch (loi) {
    if (loi.code === 11000)
      res.status(400).json({ thongBao: 'Tiêu đề hoặc slug bị trùng!' });
    else res.status(500).json({ thongBao: loi.message });
  }
};

// Xóa tin
export const xoaTin = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ thongBao: 'Đã xóa tin tức thành công!' });
  } catch (loi) {
    res.status(500).json({ thongBao: loi.message });
  }
};
