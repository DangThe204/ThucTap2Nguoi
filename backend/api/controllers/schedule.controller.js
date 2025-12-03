import Schedule from "../models/Schedule.model.js";
import Course from "../models/Course.model.js";

// POST /api/courses/:courseId/schedule  (không dùng nữa nếu đã dùng addSchedule)
export const createSchedule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { date, tietBatDau, tietKetThuc } = req.body;

    if (!date || !tietBatDau || !tietKetThuc) {
      return res
        .status(400)
        .json({ message: "Thiếu date, tietBatDau hoặc tietKetThuc" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const schedule = new Schedule({
      courseId,
      date,
      startTiet: tietBatDau,
      endTiet: tietKetThuc,
    });

    await schedule.save();
    return res.status(201).json(schedule);
  } catch (err) {
    console.error(" Lỗi createSchedule:", err);
    return res.status(500).json({ message: err.message });
  }
};