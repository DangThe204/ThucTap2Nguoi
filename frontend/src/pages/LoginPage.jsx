import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => { // ✅ 4. Chuyển thành hàm async
    e.preventDefault();
    setError(null); // Xóa lỗi cũ

    try {
      // ✅ 5. Gọi hàm login từ context
      await login(username, password);
      console.log("ROLE SAU LOGIN:", localStorage.getItem("role"));

      alert("Đăng nhập thành công!");

const role = localStorage.getItem("role");

if (role === "admin") {
  navigate("/admin/quan-ly-lich-thi");
} else {
  navigate("/");
}
 // quay lại trang chủ
    } catch (err) {
      // ✅ 6. Bắt lỗi từ AuthContext
      setError(err.message || "Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
        {/* --- Logo và tiêu đề --- */}
        <div className="flex flex-col items-center mb-6">
          <Link to='/'>
            <img src="/logo.png" alt="Logo" className="h-14 w-auto mb-2" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Đăng Nhập</h2>
          <p className="text-gray-500 text-sm">Vui lòng điền thông tin bên dưới</p>
        </div>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ✅ 7. Hiển thị lỗi nếu có */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
              {error}
            </div>
          )}

          <div>
            {/* ✅ 8. Cập nhật label và input cho 'username' */}
            <label className="block text-gray-700 font-medium mb-1">Tên đăng nhập</label>
            <input
              type="text" // Đổi từ 'email' sang 'text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
