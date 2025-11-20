import mongoose from 'mongoose';

const FamilyMemberSchema = new mongoose.Schema({
    quanHe: { type: String, trim: true },
    hoTen: { type: String, trim: true },
    namSinh: { type: String, trim: true },
    ngheNghiep: { type: String, trim: true },
    diaChi: { type: String, trim: true },
});

const HocVanSchema = new mongoose.Schema({
    maHoSo: { type: String },
    ngayVaoTruong: { type: Date },
    lopHoc: { type: String },
    coSo: { type: String },
    bacDaoTao: { type: String },
    loaiHinhDaoTao: { type: String },
    khoa: { type: String },
    nganh: { type: String },
    chuyenNganh: { type: String },
    khoaHoc: { type: String },
});

const CaNhanSchema = new mongoose.Schema({
    ngaySinh: { type: Date },
    gioiTinh: { type: String, enum: ['Nam', 'Nữ', 'Khác'] },
    danToc: { type: String },
    tonGiao: { type: String },
    quocTich: { type: String, default: 'Việt Nam' },
    khuVuc: { type: String },
    soCCCD: { type: String },
    ngayCap: { type: Date },
    noiCap: { type: String },
    doiTuong: { type: String },
    dienChinhSach: { type: String },
    ngayVaoDoan: { type: Date },
    ngayVaoDang: { type: Date },
    dienThoai: { type: String },
    email: { type: String },
    diaChiLienHe: { type: String },
    noiSinh: { type: String },
    hoKhauThuongTru: { type: String },
});

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },

    hoTen: {
        type: String,
        required: [true, 'Vui lòng nhập họ tên'],
    },
    avatar: {
        type: String,
        default: 'default_avatar.png',
    },

    thongTinHocVan: HocVanSchema,
    thongTinCaNhan: CaNhanSchema,
    thongTinGiaDinh: [FamilyMemberSchema],

}, { timestamps: true });

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;