import User from '../models/User.model.js';

// GET /api/users/students (Admin)
export const getStudents = async (req, res, next) => {
    try {
        // Logic: User.find({ role: 'student' }).select('username _id')
        const students = await User.find({ role: 'student' }).select('username _id');
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};