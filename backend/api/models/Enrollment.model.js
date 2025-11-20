import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
    userId: { // Sinh viên 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến Model 'User'
        required: true,
    },
    courseId: { // gán vào Lớp học phần 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Tham chiếu đến Model 'Course'
        required: true,
    }
}, { timestamps: true });

// Ngăn Admin gán 1 sinh viên vào 1 lớp 2 lần
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);
export default Enrollment;