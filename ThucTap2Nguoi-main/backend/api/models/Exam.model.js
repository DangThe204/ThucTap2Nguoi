import mongoose from 'mongoose';

const ExamSchema = new mongoose.Schema({
    courseId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', 
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
    monHoc: { 
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