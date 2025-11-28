import Enrollment from '../models/Enrollment.model.js';
import Course from '../models/Course.model.js';
import Exam from '../models/Exam.model.js';
import Schedule from '../models/Schedule.model.js';

// GET /api/my-timetable?weekStart=YYYY-MM-DD&weekEnd=YYYY-MM-DD
export const getMyTimetable = async (req, res, next) => {
  try {
    const { weekStart, weekEnd } = req.query;

    if (!weekStart || !weekEnd) {
      return res
        .status(400)
        .json({ message: 'Missing weekStart or weekEnd query parameters.' });
    }

    let courseIds = [];

    // ADMIN XEM TẤT CẢ LỊCH
    if (req.user.role === "admin") {
      const allCourses = await Course.find().select('_id');
      courseIds = allCourses.map(c => c._id);
    } 
    // STUDENT: chỉ xem lịch lớp đã ghi danh
    else {
      const enrollments = await Enrollment.find({ userId: req.user.id }).select('courseId');
      courseIds = enrollments.map(e => e.courseId);
    }

    // Nếu không có lớp học
    if (courseIds.length === 0) {
      return res.status(200).json({ schedules: [], exams: [] });
    }

    // 2. Lấy lịch học trong tuần đó
    const schedules = await Schedule.find({
      courseId: { $in: courseIds },
      date: { $gte: weekStart, $lte: weekEnd },
    }).populate('courseId', 'tenMonHoc phongHoc');

    const scheduleEvents = schedules.map(s => ({
      date: s.date,
      startTiet: s.startTiet,
      endTiet: s.endTiet,
      courseName: s.courseId?.tenMonHoc || 'Không tên',
      phongHoc: s.courseId?.phongHoc || 'Chưa có phòng',
    }));

    // 3. Lấy lịch thi nếu có
    const exams = await Exam.find({
      courseId: { $in: courseIds },
      thoiGianKiemTra: {
        $gte: new Date(weekStart),
        $lte: new Date(weekEnd),
      },
    }).populate('courseId', 'tenMonHoc');

    return res.status(200).json({
      schedules: scheduleEvents,
      exams,
    });

  } catch (error) {
    next(error);
  }
};
