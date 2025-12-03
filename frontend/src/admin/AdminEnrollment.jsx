import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * AdminEnrollment.jsx
 * - GET /api/users/students
 * - GET /api/courses
 * - GET /api/enrollments
 * - POST /api/enrollments  { studentId, courseId }
 *
 * Lưu ý: token (JWT) được lấy từ localStorage: localStorage.getItem('token')
 */

export default function AdminEnrollment() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolls, setEnrolls] = useState([]);

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    loadAll();
  }, []);

  const authHeaders = () => ({
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  async function loadAll() {
    setLoading(true);
    try {
      const [sRes, cRes, eRes] = await Promise.all([
        axios.get("/api/users/students", authHeaders()),
        axios.get("/api/courses", authHeaders()),
        axios.get("/api/enrollments", authHeaders()),
      ]);

      setStudents(sRes.data || []);
      setCourses(cRes.data || []);
      setEnrolls(eRes.data || []);
    } catch (err) {
      console.error("Load error", err);
      alert("Lỗi tải dữ liệu. Kiểm tra console.");
    } finally {
      setLoading(false);
    }
  }

  const handleAssign = async () => {
    if (!selectedStudentId || !selectedCourseId) {
      alert("Chọn sinh viên và lớp trước khi gán.");
      return;
    }

    try {
      await axios.post(
        "/api/enrollments",
        {
          studentId: selectedStudentId, // dạng: "2200006158"
          courseId: selectedCourseId,   // _id của course
        },
        authHeaders()
      );

      alert("Gán sinh viên thành công!");
      // reload danh sách phân công
      const eRes = await axios.get("/api/enrollments", authHeaders());
      setEnrolls(eRes.data || []);
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.error || err.message || "Lỗi";
      alert("Gán thất bại: " + message);
    }
  };

  const handleRemoveEnrollment = async (enrollId) => {
    if (!window.confirm("Xác nhận xóa phân công này?")) return;
    try {
      await axios.delete(`/api/enrollments/${enrollId}`, authHeaders());
      setEnrolls(enrolls.filter((e) => e._id !== enrollId));
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Phân công sinh viên vào lớp</h2>

      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 12 }}>Chọn sinh viên</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                style={{ padding: 8, minWidth: 220 }}
              >
                <option value="">-- Chọn sinh viên --</option>
                {students.map((s) => (
                  <option key={s._id} value={s.studentId || s._id}>
                    {s.studentId ? `${s.studentId} - ${s.name}` : s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12 }}>Chọn lớp</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                style={{ padding: 8, minWidth: 300 }}
              >
                <option value="">-- Chọn lớp --</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.code ? `${c.code} — ${c.name}` : c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button onClick={handleAssign} style={{ padding: "8px 12px", background: "#2b6cb0", color: "white", borderRadius: 6 }}>
                Gán
              </button>
            </div>
          </div>

          <h3>Danh sách phân công</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Sinh viên</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Lớp</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Trạng thái</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {enrolls.map((en) => (
                <tr key={en._id}>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>
                    {en.student?.studentId ? `${en.student.studentId} — ${en.student.name}` : (en.student?.name || "-")}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>
                    {en.course?.code ? `${en.course.code} — ${en.course.title || en.course.name}` : (en.course?.title || "-")}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>{en.status || "active"}</td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>
                    <button
                      onClick={() => handleRemoveEnrollment(en._id)}
                      style={{ padding: "6px 10px", background: "#e53e3e", color: "white", borderRadius: 6 }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}

              {enrolls.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: 12 }}>Chưa có phân công</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
