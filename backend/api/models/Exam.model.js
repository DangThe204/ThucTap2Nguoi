import mongoose from 'mongoose';

const ExamSchema = new mongoose.Schema({
    courseId: { // Gán lịch thi cho 1 Lớp Học Phần cụ thể
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Tham chiếu đến Model 'Course'
        required: true,
    },
    thoiGianKiemTra: {
        type: Date,
        required: true,
    },
    phong: {
        type: String,
        required: true,
    },
    monHoc: { // Tên môn học (để hiển thị nhanh)
        type: String,
        required: true,
    },
    hinhThucKiemTra: {
        type: String,
    },
    thoiGianLamBai: {
        type: String,
    }
}, { timestamps: true });

const Exam = mongoose.model('Exam', ExamSchema);
export default Exam;