import Enrollment from '../models/Enrollment.model.js';
import Course from '../models/Course.model.js';
import Exam from '../models/Exam.model.js';


// GET /api/my-timetable (Sinh viên)
export const getMyTimetable = async (req, res, next) => {
    try {
        // 1. Input: req.user.id (from xacThucNguoiDung), req.query (weekStart, weekEnd)
        const userId = req.user.id; 
        const { weekStart, weekEnd } = req.query;

        if (!weekStart || !weekEnd) {
            return next(errorHandler(400, 'Missing weekStart or weekEnd query parameters.'));
        }

        // Chuyển đổi sang đối tượng Date để so sánh trong MongoDB
        const startOfWeek = new Date(weekStart);
        const endOfWeek = new Date(weekEnd);

        // 2. Dùng req.user.id để Enrollment.find({ userId: req.user.id })
        const enrollments = await Enrollment.find({ userId: userId }).select('courseId');
        
        // 3. Lấy ra mảng courseIds mà sinh viên này học
        const courseIds = enrollments.map(e => e.courseId);

        if (courseIds.length === 0) {
            return res.status(200).json({ courses: [], exams: [] });
        }

        // 4. Tìm Course: Giao nhau giữa (startDate/endDate của Course) VÀ (weekStart/weekEnd)
        // Hai khoảng thời gian [A, B] và [C, D] giao nhau khi: A <= D VÀ C <= B
        const courses = await Course.find({
            _id: { $in: courseIds },
            // Logic: course.startDate <= endOfWeek VÀ startOfWeek <= course.endDate
            startDate: { $lte: endOfWeek },
            endDate: { $gte: startOfWeek }
        });

        // Lấy lại courseIds từ các Course đã được lọc (chỉ các môn học trong tuần xem)
        const filteredCourseIds = courses.map(c => c._id);

        // 5. Tìm Exam: Dùng Exam.find() với điều kiện courseId: { $in: filteredCourseIds } VÀ thoiGianKiemTra phải nằm trong weekStart/weekEnd.
        const exams = await Exam.find({
            courseId: { $in: filteredCourseIds },
            thoiGianKiemTra: { 
                $gte: startOfWeek, // >= weekStart
                $lte: endOfWeek    // <= weekEnd
            }
        }).populate('courseId', 'tenMonHoc'); // Có thể populate tên môn học cho dễ hiển thị

        // 6. Trả về { courses, exams }
        res.status(200).json({ 
            courses, 
            exams 
        });

    } catch (error) {
        next(error);
    }
};