import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { adminGetExams } from "../api/adminExamApi";
import api from "../api/axiosConfig";

export default function AdminExams() {
    const [exams, setExams] = useState([]);
    const [courses, setCourses] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [viewMode, setViewMode] = useState("manage"); // manage = CRUD, view = xem lịch thi

    const [formData, setFormData] = useState({
        courseId: "",
        thoiGianKiemTra: "",
        phong: "",
        hinhThucKiemTra: "",
        thoiGianLamBai: ""
    });

    useEffect(() => {
        api.get("/courses")
            .then(res => setCourses(res.data))
            .catch(err => console.error("Lỗi tải danh sách lớp học phần:", err));

        loadExams();
    }, []);

    const loadExams = () => {
        adminGetExams().then(res => setExams(res.data));
    };

    const openCreateForm = () => {
        setIsEditing(false);
        setFormData({
            courseId: "",
            thoiGianKiemTra: "",
            phong: "",
            hinhThucKiemTra: "",
            thoiGianLamBai: ""
        });
        setShowForm(true);
    };

    const openEditForm = (exam) => {
        setIsEditing(true);
        setEditId(exam._id);

        setFormData({
            courseId: exam.courseId._id,
            thoiGianKiemTra: exam.thoiGianKiemTra.slice(0, 16),
            phong: exam.phong,
            hinhThucKiemTra: exam.hinhThucKiemTra,
            thoiGianLamBai: exam.thoiGianLamBai
        });

        setShowForm(true);
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                await api.put(`/exams/${editId}`, formData);
            } else {
                await api.post("/exams", formData);
            }

            setShowForm(false);
            loadExams();
        } catch (err) {
            console.error("Lỗi tạo lịch thi:", err);
            alert("Không thể tạo lịch thi!");
        }
    };

    const deleteExam = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xoá lịch thi này?")) return;

        try {
            await api.delete(`/exams/${id}`);
            loadExams();
        } catch (err) {
            console.error("Xóa thất bại:", err);
            alert("Không thể xóa lịch thi!");
        }
    };

    // ======================================
    //  CHẾ ĐỘ XEM LỊCH THI (GIỐNG WEBSITE TRƯỜNG)
    // ======================================
    if (viewMode === "view") {
        return (
            <div className="pt-32 px-6 pb-20 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                    LỊCH THI
                </h2>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setViewMode("manage")}
                        className="px-5 py-3 rounded-full shadow bg-blue-600 text-white"
                    >
                        Quay lại quản lý
                    </button>
                </div>

                <table className="w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="border px-3 py-2">Thời gian kiểm tra</th>
                            <th className="border px-3 py-2">Phòng</th>
                            <th className="border px-3 py-2">Môn học / Mô đun</th>
                            <th className="border px-3 py-2">Mã lớp</th>
                            <th className="border px-3 py-2">Hình thức</th>
                            <th className="border px-3 py-2">Thời gian làm bài</th>
                        </tr>
                    </thead>

                    <tbody>
                        {exams.map((ex) => {
                            const date = new Date(ex.thoiGianKiemTra);
                            const timeString = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
                            const dateString = date.toLocaleDateString("vi-VN");

                            return (
                                <tr key={ex._id} className="text-center border">
                                    <td className="py-2 border text-red-600 font-bold">
                                        {timeString} {dateString}
                                    </td>

                                    <td className="py-2 border text-blue-700 font-semibold underline">
                                        {ex.phong}
                                    </td>

                                    <td className="py-2 border">{ex.courseId.tenMonHoc}</td>

                                    <td className="py-2 border text-blue-600 font-bold underline">
                                        {ex.courseId.maLopHocPhan}
                                    </td>

                                    <td className="py-2 border">{ex.hinhThucKiemTra}</td>

                                    <td className="py-2 border text-red-600 font-bold">
                                        {ex.thoiGianLamBai}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    // ======================================
    //  CHẾ ĐỘ QUẢN LÝ CRUD
    // ======================================
    return (
        <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Quản Lý Lịch Thi (Admin)
            </h2>

            {/* BUTTONS */}
            <div className="flex justify-end mb-6 gap-3">
                <button
                    onClick={() => setViewMode("manage")}
                    className={`px-5 py-3 rounded-full shadow ${viewMode === "manage" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                >
                    Quản lý
                </button>

                <button
                    onClick={() => setViewMode("view")}
                    className={`px-5 py-3 rounded-full shadow ${viewMode === "view" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                >
                    Xem lịch thi
                </button>

                <button
                    onClick={openCreateForm}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition"
                >
                    <FaPlus /> Tạo lịch thi
                </button>
            </div>

            {/* LIST CRUD */}
            <div className="bg-white border rounded-xl shadow p-5">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3">Môn học</th>
                            <th className="py-3">Lớp HP</th>
                            <th className="py-3">Ngày thi</th>
                            <th className="py-3">Phòng</th>
                            <th className="py-3">Hình thức</th>
                            <th className="py-3">Thời lượng</th>
                            <th className="py-3">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {exams.map((ex) => (
                            <tr key={ex._id} className="border-b hover:bg-gray-50">
                                <td className="py-3">{ex.courseId.tenMonHoc}</td>
                                <td className="py-3">{ex.courseId.maLopHocPhan}</td>
                                <td className="py-3">
                                    {new Date(ex.thoiGianKiemTra).toLocaleString("vi-VN")}
                                </td>
                                <td className="py-3">{ex.phong}</td>
                                <td className="py-3">{ex.hinhThucKiemTra}</td>
                                <td className="py-3">{ex.thoiGianLamBai}</td>

                                <td className="py-3">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            className="p-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                                            onClick={() => openEditForm(ex)}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            className="p-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                                            onClick={() => deleteExam(ex._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* POPUP FORM */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-96 p-6 rounded-xl shadow-xl">

                        <h3 className="text-xl font-bold mb-4">
                            {isEditing ? "Sửa Lịch Thi" : "Tạo Lịch Thi"}
                        </h3>

                        <label className="font-semibold">Lớp học phần</label>
                        <select
                            className="w-full p-2 border rounded mb-3"
                            value={formData.courseId}
                            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                        >
                            <option value="">-- Chọn lớp học phần --</option>
                            {courses.map(c => (
                                <option key={c._id} value={c._id}>
                                    {c.tenMonHoc} - {c.maLopHocPhan}
                                </option>
                            ))}
                        </select>

                        <label className="font-semibold">Thời gian kiểm tra</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border rounded mb-3"
                            value={formData.thoiGianKiemTra}
                            onChange={(e) => setFormData({ ...formData, thoiGianKiemTra: e.target.value })}
                        />

                        <label className="font-semibold">Phòng</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mb-3"
                            value={formData.phong}
                            onChange={(e) => setFormData({ ...formData, phong: e.target.value })}
                        />

                        <label className="font-semibold">Hình thức kiểm tra</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mb-3"
                            value={formData.hinhThucKiemTra}
                            onChange={(e) => setFormData({ ...formData, hinhThucKiemTra: e.target.value })}
                        />

                        <label className="font-semibold">Thời gian làm bài</label>
                        <select
                            className="w-full p-2 border rounded mb-3"
                            value={formData.thoiGianLamBai}
                            onChange={(e) => setFormData({ ...formData, thoiGianLamBai: e.target.value })}
                        >
                            <option value="">-- Chọn thời gian --</option>
                            <option value="30 phút">30 phút</option>
                            <option value="45 phút">45 phút</option>
                            <option value="60 phút">60 phút</option>
                            <option value="90 phút">90 phút</option>
                            <option value="120 phút">120 phút</option>
                        </select>

                        <div className="flex justify-end gap-2 mt-3">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={handleSubmit}
                            >
                                {isEditing ? "Cập nhật" : "Tạo"}
                            </button>

                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                onClick={() => setShowForm(false)}
                            >
                                Hủy
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
