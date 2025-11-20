import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Vui lòng nhập tiêu đề'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Vui lòng nhập nội dung'],
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
    },
    author: {
        type: String,
        default: 'Admin',
    }
}, { timestamps: true });

// Tự động tạo slug từ title
NewsSchema.pre('save', function (next) {
    if (this.isModified('title') || this.isNew) {
        this.slug = this.title
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    next();
});

const News = mongoose.model('News', NewsSchema);
export default News;