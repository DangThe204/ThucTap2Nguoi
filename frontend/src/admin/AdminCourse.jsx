import React, { useEffect, useState } from "react";
import axios from "axios";


export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    teacher: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Popup schedule
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Load course list
  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/courses");
      setCourses(res.data || []);
    } catch (err) {
      console.error("❌ Lỗi load courses:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "", code: "", teacher: "" });
    setEditingId(null);
  };

  // Tạo hoặc sửa lớp học phần
  const saveCourse = async () => {
  const { name, code, teacher } = formData;

  if (!name.trim() || !code.trim()) {
    alert("Vui lòng nhập đầy đủ Tên lớp và Mã lớp.");
    return;
  }

  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const payload = {
      tenMonHoc: name,
      maLopHocPhan: code,
      giaoVien: teacher,
      maLopChinh: "L01",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
    };

    let res;

    if (editingId) {
      res = await axios.put(`/api/courses/${editingId}`, payload, { headers });
      alert("Sửa lớp học phần thành công!");
      setCourses((prev) =>
        prev.map((c) => (c._id === editingId ? res.data : c))
      );
    } else {
      res = await axios.post(`/api/courses`, payload, { headers });
      alert("Tạo lớp học phần thành công!");
      setCourses((prev) => [res.data, ...prev]);
    }

    resetForm();
  } catch (err) {
    console.error(err);
    alert("❌ Lỗi khi lưu lớp học phần!");
  }
};


  // Xoá lớp học phần
  const deleteCourse = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa lớp này?")) return;

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios.delete(`/api/courses/${id}`, { headers });

      setCourses((prev) => prev.filter((c) => c._id !== id));
      alert("Xóa lớp thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xóa lớp!");
    }
  };

  // Sửa
  const startEdit = (course) => {
    setEditingId(course._id);
    setFormData({
      name: course.tenMonHoc || "",
code: course.maLopHocPhan || "",
      teacher: course.giaoVien || "",
    });
  };

  // ---- Tạo lịch học ----
  const createSchedule = async () => {
    if (!date || !startTime || !endTime) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (startTime >= endTime) {
      alert("Giờ bắt đầu phải nhỏ hơn giờ kết thúc!");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

      await axios.post(
        `/api/courses/${selectedCourse._id}/schedule`,
        { date, startTime, endTime },
        { headers }
      );

      alert("Tạo lịch học thành công!");
      closePopup();
      loadCourses(); // reload để cập nhật schedules
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi tạo lịch học!");
    }
  };

  const closePopup = () => {
    setShowScheduleForm(false);
    setDate("");
    setStartTime("");
    setEndTime("");
    setSelectedCourse(null);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Quản lý lớp học phần</h1>

      {/* FORM */}
      <div className="p-4 border rounded mb-5 bg-gray-50">
        <h2 className="font-bold mb-3">
          {editingId ? "Sửa lớp học phần" : "Tạo lớp học phần"}
        </h2>

        <div className="grid grid-cols-3 gap-3">
          <input className="border p-2 rounded" placeholder="Tên lớp" name="name" value={formData.name} onChange={handleFormChange} />
          <input className="border p-2 rounded" placeholder="Mã lớp" name="code" value={formData.code} onChange={handleFormChange} />
          <input className="border p-2 rounded" placeholder="Giảng viên" name="teacher" value={formData.teacher} onChange={handleFormChange} />
        </div>

        <div className="mt-3 flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={saveCourse}>
            {editingId ? "Lưu thay đổi" : "Thêm lớp"}
          </button>
          {editingId && (
            <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={resetForm}>Hủy</button>
          )}
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Tên lớp</th>
              <th className="border p-2">Mã lớp</th>
              <th className="border p-2">Giảng viên</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-3 text-gray-500">Không có lớp học phần nào.</td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id}>
<td className="border p-2 text-left">{course.tenMonHoc}</td>
                  <td className="border p-2">{course.maLopHocPhan}</td>
                  <td className="border p-2">{course.giaoVien}</td>

                  <td className="border p-2">
                    <div className="flex gap-2 justify-center">
                      <button className="px-3 py-1 bg-yellow-500 text-white rounded" onClick={() => startEdit(course)}>Sửa</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => deleteCourse(course._id)}>Xóa</button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => { setSelectedCourse(course); setShowScheduleForm(true); }}>+ Lịch</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* POPUP TẠO LỊCH */}
      {showScheduleForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">
              Tạo lịch cho lớp: <span className="text-blue-600">{selectedCourse?.tenMonHoc}</span>
            </h2>

            <label className="block mt-3">Ngày học</label>
            <input type="date" className="border w-full p-2 rounded" value={date} onChange={(e) => setDate(e.target.value)} />

            <label className="block mt-3">Giờ bắt đầu</label>
            <input type="time" className="border w-full p-2 rounded" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <label className="block mt-3">Giờ kết thúc</label>
            <input type="time" className="border w-full p-2 rounded" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

            <div className="flex justify-end mt-6 gap-2">
              <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={closePopup}>Hủy</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={createSchedule}>Lưu lịch</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}