import Enrollment from '../models/Enrollment.model.js';


// POST /api/enrollments (Admin)
export const createEnrollment = async (req, res, next) => {
    try {
        // Input: req.body (userId, courseId). Logic: new Enrollment(req.body).save(). Bắt lỗi 11000
        const newEnrollment = new Enrollment(req.body);
        const savedEnrollment = await newEnrollment.save();
        res.status(201).json(savedEnrollment);
    } catch (error) {
        if (error.code === 11000) {
            // Lỗi 11000 cho Enrollment thường xảy ra khi userId và courseId đã tồn tại (unique index)
            return res.status(409).json({ 
                success: false, 
                message: 'This student is already enrolled in this course.' 
            });
        }
        next(error);
    }
};

// DELETE /api/enrollments/:id (Admin)
export const deleteEnrollment = async (req, res, next) => {
    try {
        // Logic: Enrollment.findByIdAndDelete()
        const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!deletedEnrollment) {
            return next(errorHandler(404, 'Enrollment not found!'));
        }
        res.status(200).json('Enrollment has been deleted successfully.');
    } catch (error) {
        next(error);
    }
};

// GET /api/enrollments/by-course/:courseId (Admin)
export const getEnrollmentsByCourse = async (req, res, next) => {
    try {
        // Logic: Enrollment.find({ courseId }).populate('userId', 'username')
        const enrollments = await Enrollment.find({ 
            courseId: req.params.courseId 
        }).populate('userId', 'username');

        res.status(200).json(enrollments);
    } catch (error) {
        next(error);
    }
};