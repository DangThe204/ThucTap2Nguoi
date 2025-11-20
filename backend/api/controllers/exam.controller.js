import Exam from "../models/Exam.model.js";
import Course from "../models/Course.model.js";

// ✅ Get All Exams (Admin)
export const getExams = async (req, res) => {
    try {
        const exams = await Exam.find()
            .populate("courseId", "maLopHocPhan tenMonHoc")
            .sort({ thoiGianKiemTra: -1 });

        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Create Exam (Admin)
export const createExam = async (req, res) => {
    try {
        const { courseId, thoiGianKiemTra, phong, hinhThucKiemTra, thoiGianLamBai } = req.body;

        // Lấy thông tin môn học
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const newExam = new Exam({
            courseId,
            thoiGianKiemTra,
            phong,
            hinhThucKiemTra,
            thoiGianLamBai,
            monHoc: course.tenMonHoc, // ✅ tự điền tên môn vào DB
        });

        await newExam.save();
        res.status(201).json(newExam);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Update Exam
export const updateExam = async (req, res) => {
    try {
        const updated = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Delete Exam
export const deleteExam = async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Exam deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// API  cho sinh viên
export const getExamLopOptions = async (req, res) => {
    try {
        const courseIds = await Exam.distinct('courseId');
        const lopOptions = await Course.distinct('maLopChinh', { _id: { $in: courseIds } });
        res.status(200).json(lopOptions.sort());
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// API  cho sinh viên
export const getPublicExams = async (req, res) => {
    try {
        const { maLopChinh, tuNgay, denNgay } = req.query;
        if (!maLopChinh) {
            return res.status(400).json({ message: 'Vui lòng chọn Lớp' });
        }

        const courses = await Course.find({ maLopChinh }).select('_id');
        const courseIds = courses.map(c => c._id);

        if (courseIds.length === 0) {
            return res.status(200).json([]);
        }

        const query = {
            courseId: { $in: courseIds }
        };

        if (tuNgay || denNgay) {
            query.thoiGianKiemTra = {};
            if (tuNgay) query.thoiGianKiemTra.$gte = new Date(tuNgay);
            if (denNgay) {
                const endDate = new Date(denNgay);
                endDate.setDate(endDate.getDate() + 1);
                query.thoiGianKiemTra.$lt = endDate;
            }
        }

        const exams = await Exam.find(query).sort({ thoiGianKiemTra: 'asc' });
        res.status(200).json(exams);

    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
