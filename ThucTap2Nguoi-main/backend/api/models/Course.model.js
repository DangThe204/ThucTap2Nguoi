import mongoose from 'mongoose';

// Chi tiết lịch học hàng tuần (chưa dùng tới, có thể xoá sau)
const TimeSlotSchema = new mongoose.Schema({
  thu: { type: String, required: true },
  buoi: { type: String, required: true },
  tiet: { type: String, required: true },
  loaiHoc: {
    type: String,
    enum: ['Lý thuyết', 'Thực hành', 'Trực tuyến'],
    default: 'Lý thuyết',
  },
  diaDiem: { type: String },
});

// Lớp Học Phần
const CourseSchema = new mongoose.Schema(
  {
    tenMonHoc: { type: String, required: true },
    maLopHocPhan: { type: String, required: true, unique: true },
    maLopChinh: { type: String, required: true },

    phongHoc: { type: String, required: true },   

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', CourseSchema);
export default Course;
