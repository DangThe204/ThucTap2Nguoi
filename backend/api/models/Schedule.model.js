// models/Schedule.model.js
import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    date: { type: String, required: true },      // 'YYYY-MM-DD'
    startTime: { type: String, required: true }, // 'HH:mm'
    endTime: { type: String, required: true },   // 'HH:mm'
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", ScheduleSchema);
