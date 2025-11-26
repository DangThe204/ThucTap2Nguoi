import Profile from '../models/Profile.model.js';
import User from '../models/User.model.js'; // Cần để lấy danh sách SV

// === API CHO SINH VIÊN (Đã đăng nhập) ===

// Lấy hồ sơ CÁ NHÂN (GET /api/profile/me)
export const getMyProfile = async (req, res) => {
    try {
        // req.user.id được lấy từ middleware verifyToken
        const profile = await Profile.findOne({ userId: req.user.id });

        if (!profile) {
            // Nếu sinh viên đã có tài khoản User nhưng chưa được Admin tạo hồ sơ
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ. Vui lòng liên hệ Admin.' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SINH VIÊN: Tự cập nhật (chỉ các trường an toàn) (PUT /api/profile/me)
export const updateMyProfile = async (req, res) => {
    try {
        // Lấy các trường SV được phép sửa từ req.body
        const { email, soDienThoai, diaChiLienHe, hoKhauThuongTru } = req.body;

        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            {
                // Chỉ cập nhật các trường này trong thongTinCaNhan
                'thongTinCaNhan.email': email,
                'thongTinCaNhan.dienThoai': soDienThoai,
                'thongTinCaNhan.diaChiLienHe': diaChiLienHe,
                'thongTinCaNhan.hoKhauThuongTru': hoKhauThuongTru,
            },
            { new: true } // Trả về data mới
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ để cập nhật.' });
        }
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// === API CHO ADMIN (Bảo vệ) ===

// ADMIN: Lấy TẤT CẢ hồ sơ (GET /api/profile)
export const getAllProfiles = async (req, res) => {
    try {
        // Populate để lấy luôn 'username' (MSSV) từ User Model
        const profiles = await Profile.find().populate('userId', 'username');
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADMIN: Tạo hồ sơ MỚI cho 1 sinh viên (POST /api/profile)
export const createProfile = async (req, res) => {
    try {
        // Admin sẽ gửi 'userId' và toàn bộ data (hoTen, thongTinHocVan, thongTinCaNhan...)
        const newProfile = new Profile(req.body);
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        if (error.code === 11000) { // Lỗi 'unique'
            return res.status(400).json({ message: 'Sinh viên này đã có hồ sơ (Lỗi Trùng userId).' });
        }
        res.status(500).json({ message: error.message });
    }
};

// ADMIN: Lấy chi tiết 1 hồ sơ (GET /api/profile/:id)
export const getProfileById = async (req, res) => {
    try {
        const { id } = req.params; // id này là ID của PROFILE
        const profile = await Profile.findById(id).populate('userId', 'username');
        if (!profile) {
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ.' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADMIN: Sửa 1 hồ sơ (PUT /api/profile/:id)
export const updateProfileById = async (req, res) => {
    try {
        const { id } = req.params; // id này là ID của PROFILE
        // Admin được sửa tất cả
        const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ.' });
        }
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};