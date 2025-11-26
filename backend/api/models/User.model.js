import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Vui lòng cung cấp tên đăng nhập'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Vui lòng cung cấp mật khẩu'],
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  }
}, { timestamps: true });

// Tự động hash mật khẩu trước khi lưu
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Thêm phương thức để so sánh mật khẩu (cho API Đăng nhập)
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;