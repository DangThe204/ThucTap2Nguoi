// File: News.model.js
import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    imageUrl: { 
      type: String,
      default: '', // Có thể đặt mặc định là một URL ảnh placeholder
    },
    tieuDe: {
      type: String,
      required: true,
      trim: true,
    },
    noiDung: {
      type: String,
      required: true,
    },
    tacGia: {
      type: String,
      default: 'Admin',
    },
    // Thêm trường slug để dùng cho URL thân thiện (ví dụ: /news/tieu-de-tin-tuc-abc)
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Middleware để tạo slug trước khi lưu
NewsSchema.pre('save', function(next) {
    if (this.isModified('tieuDe') || this.isNew) {
        this.slug = this.tieuDe.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
    next();
});

export default mongoose.model('News', NewsSchema);