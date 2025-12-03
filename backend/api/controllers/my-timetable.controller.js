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

    //ADMIN → xem tất cả lớp
    if (req.user.role === "admin") {
      const allCourses = await Course.find().select("_id");
      courseIds = allCourses.map(c => c._id);
    }

    // STUDENT → CŨNG xem tất cả lớp (theo yêu cầu của bạn)
    else if (req.user.role === "student") {
      const allCourses = await Course.find().select("_id");
      courseIds = allCourses.map(c => c._id);
    }

    // 2. Lấy lịch học theo tuần
    const schedules = await Schedule.find({
      courseId: { $in: courseIds },
      date: { $gte: weekStart, $lte: weekEnd },
    }).populate("courseId", "tenMonHoc phongHoc maLopHP");

    const scheduleEvents = schedules.map(s => ({
      date: s.date,
      startTiet: s.startTiet,
      endTiet: s.endTiet,
      courseName: s.courseId?.tenMonHoc || "Không tên",
      phongHoc: s.courseId?.phongHoc || "Chưa có phòng",
      classCode: s.courseId?.maLopHP || "",
    }));

    return res.status(200).json({
      schedules: scheduleEvents,
      exams: [],
    });

  } catch (error) {
    next(error);
  }
};
