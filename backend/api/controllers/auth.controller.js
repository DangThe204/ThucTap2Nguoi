import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

// Đăng ký tài khoản mới
export const dangKy = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const tonTai = await User.findOne({ username });
    if (tonTai) return res.status(400).json({ thongBao: 'Tên đăng nhập đã tồn tại!' });

    const nguoiDungMoi = new User({ username, password, role });
    await nguoiDungMoi.save();
    res.status(201).json({ thongBao: 'Đăng ký tài khoản thành công!' });
  } catch (loi) {
    res.status(500).json({ thongBao: loi.message });
  }
};

// Đăng nhập tài khoản
export const dangNhap = async (req, res) => {
  try {
    const { username, password } = req.body;
    const nguoiDung = await User.findOne({ username });
    if (!nguoiDung) return res.status(401).json({ thongBao: 'Không tìm thấy người dùng!' });

    const dungMatKhau = await nguoiDung.comparePassword(password);
    if (!dungMatKhau) return res.status(401).json({ thongBao: 'Mật khẩu không đúng!' });

    const token = jwt.sign(
      { id: nguoiDung._id, role: nguoiDung.role },
      process.env.JWT_SECRET || 'matkhau_bimat',
      { expiresIn: '1d' }
    );

    const { password: _, ...thongTinNguoiDung } = nguoiDung._doc;
    res.status(200).json({ token, nguoiDung: thongTinNguoiDung });
  } catch (loi) {
    res.status(500).json({ thongBao: loi.message });
  }
};
