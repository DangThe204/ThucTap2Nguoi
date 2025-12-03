import Course from '../models/Course.model.js';
import Schedule from '../models/Schedule.model.js';
import { errorHandler } from "../utils/error.js";

// --- Helper xử lý duplicate key (11000) ---
const handleDuplicateKeyError = (err, res) => {
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate key error: A course with this unique identifier already exists.'
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};

// ===============================
// POST /api/courses (Admin)
// ===============================
export const createCourse = async (req, res, next) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    if (error.code === 11000) {
      return handleDuplicateKeyError(error, res);
    }
    next(error);
  }
};

// ===============================
//  PUT /api/courses/:id (Admin)
// ===============================
export const updateCourse = async (req, res, next) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedCourse) {
      return next(errorHandler(404, 'Course not found!'));
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    if (error.code === 11000) {
      return handleDuplicateKeyError(error, res);
    }
    next(error);
  }
};

// ===============================
// DELETE /api/courses/:id
// ===============================
export const deleteCourse = async (req, res, next) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return next(errorHandler(404, 'Course not found!'));
    }
    res.status(200).json('Course has been deleted successfully.');
  } catch (error) {
    next(error);
  }
};

// ===============================
// GET /api/courses
// ===============================
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).populate("schedules");
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// ===============================
// GET /api/courses/:id
// ===============================
export const getCourseDetails = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate("schedules");
    if (!course) {
      return next(errorHandler(404, 'Course not found!'));
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// ======================================================
// POST /api/courses/:id/schedule — thêm lịch học (theo TIẾT)
// ======================================================
export const addSchedule = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const { date, tietBatDau, tietKetThuc } = req.body;

    if (!date || !tietBatDau || !tietKetThuc) {
      return res.status(400).json({
        success: false,
        message: "Missing date, tietBatDau hoặc tietKetThuc"
      });
    }

    // tạo lịch
    const schedule = await Schedule.create({
      courseId,
      date,
      startTiet: tietBatDau,
      endTiet: tietKetThuc,
    });

    // lưu id lịch vào course
    await Course.findByIdAndUpdate(courseId, {
      $push: { schedules: schedule._id }
    });

    res.status(201).json({
      success: true,
      message: "Schedule created successfully!",
      schedule,
    });

  } catch (error) {
    console.error("addSchedule error:", error);
    next(error);
  }
};