// controllers/schedule.controller.js
import Schedule from "../models/Schedule.model.js";
import Course from "../models/Course.model.js";

// POST /api/courses/:courseId/schedule
export const createSchedule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: "Thiếu date, startTime hoặc endTime" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const schedule = new Schedule({
      courseId,
      date,
      startTime,
      endTime,
    });

    await schedule.save();
    return res.status(201).json(schedule);
  } catch (err) {
    console.error("❌ Lỗi createSchedule:", err);
    return res.status(500).json({ message: err.message });
  }
};
