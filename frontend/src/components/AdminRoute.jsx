import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Chưa đăng nhập → đá về login
  if (!token) return <Navigate to="/login" replace />;

  // Không phải admin → đá về login
  if (role !== "admin") return <Navigate to="/login" replace />;

  // Đúng admin → cho vào trang admin
  return children;
}
