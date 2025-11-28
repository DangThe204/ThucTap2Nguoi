import Exam from "../models/Exam.model.js";
import Course from "../models/Course.model.js";

// ============================
// ADMIN APIs
// ============================

// GET ALL EXAMS (Admin)
export const getExams = async (req, res) => {
    try {
        const exams = await Exam.find()
            .populate("courseId", "tenMonHoc maLopHocPhan maLopChinh")
            .sort({ thoiGianKiemTra: -1 });
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE EXAM (Admin)
export const createExam = async (req, res) => {
    try {
        const { courseId, thoiGianKiemTra, phong, hinhThucKiemTra, thoiGianLamBai } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Lớp học phần không tồn tại" });

        const newExam = new Exam({
            courseId,
            monHoc: course.tenMonHoc,   // backend tự gán
            thoiGianKiemTra,
            phong,
            hinhThucKiemTra,
            thoiGianLamBai
        });

        await newExam.save();
        res.status(201).json(newExam);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// UPDATE Exam
export const updateExam = async (req, res) => {
    try {
        const updated = await Exam.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("courseId", "tenMonHoc maLopHocPhan maLopChinh");

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE Exam
export const deleteExam = async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Exam deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ============================
// PUBLIC APIs
// ============================

// GET LIST LỚP CHÍNH có lịch thi
export const getExamLopOptions = async (req, res) => {
    try {
        const examCourseIds = await Exam.distinct("courseId");

        const lopOptions = await Course.distinct("maLopChinh", {
            _id: { $in: examCourseIds }
        });

        res.status(200).json(lopOptions.sort());
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// GET PUBLIC EXAMS theo lớp chính + ngày
export const getPublicExams = async (req, res) => {
    try {
        const { maLopChinh, tuNgay, denNgay } = req.query;

        if (!maLopChinh) {
            return res.status(400).json({ message: "Vui lòng chọn Lớp" });
        }

        // Lấy danh sách Course thuộc lớp chính
        const courses = await Course.find({ maLopChinh }).select("_id");
        const courseIds = courses.map(c => c._id);

        if (courseIds.length === 0) {
            return res.status(200).json([]);
        }

        const query = {
            courseId: { $in: courseIds }
        };

        // Lọc ngày
        if (tuNgay || denNgay) {
            query.thoiGianKiemTra = {};

            if (tuNgay) query.thoiGianKiemTra.$gte = new Date(tuNgay);

            if (denNgay) {
                const endDate = new Date(denNgay);
                endDate.setDate(endDate.getDate() + 1);
                query.thoiGianKiemTra.$lt = endDate;
            }
        }

        // MUST POPULATE để hiển thị tên môn học FE
        const exams = await Exam.find(query)
            .populate("courseId", "tenMonHoc maLopHocPhan maLopChinh")
            .sort({ thoiGianKiemTra: 1 });

        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};
