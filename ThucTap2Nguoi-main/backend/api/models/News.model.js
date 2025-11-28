// File: News.model.js
import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    imageUrl: { 
      type: String,
      default: '', 
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
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Middleware để tạo slug trước khi lưu
NewsSchema.pre('save', function(next) {
    if (this.isModified('tieuDe') || this.isNew) {
        this.slug = this.tieuDe.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
    next();
});

export default mongoose.model('News', NewsSchema);