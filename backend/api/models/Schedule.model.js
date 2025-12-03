import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    // ngày học dạng 'YYYY-MM-DD'
    date: { type: String, required: true },

    // Tiết bắt đầu / kết thúc (ví dụ 1–3, 7–11)
    startTiet: { type: Number, required: true },
    endTiet: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", ScheduleSchema);