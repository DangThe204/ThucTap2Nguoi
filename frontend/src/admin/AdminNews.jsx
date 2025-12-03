import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "", 
    content: "", 
    author: "", 
  });

  const [selectedFile, setSelectedFile] = useState(null); 
  const [editingId, setEditingId] = useState(null);

  const loadNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/news");
      setNews(res.data || []);
    } catch (err) {
      console.error("Lỗi load tin tức:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  const resetForm = () => {
    setFormData({ title: "", content: "", author: "" });
    setEditingId(null);
    setSelectedFile(null); 
  };

  // Bắt đầu sửa
  const startEdit = (newsItem) => {
    setEditingId(newsItem._id);
    setFormData({
      title: newsItem.tieuDe || "",
      content: newsItem.noiDung || "",
      author: newsItem.tacGia || "",
    });
    setSelectedFile(null); 
  };

  // Tạo hoặc sửa tin tức
  const saveNews = async () => {
    const { title, content, author } = formData;

    if (!title.trim() || !content.trim()) {
      alert("Vui lòng nhập đầy đủ Tiêu đề và Nội dung.");
      return;
    }

    try {
      const data = new FormData();
      data.append('tieuDe', title);
      data.append('noiDung', content);
      data.append('tacGia', author);
      
      if (selectedFile) {
        data.append('image', selectedFile); 
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      let res;

      if (editingId) {
        // Cập nhật (PUT)
        res = await axios.put(`/api/news/${editingId}`, data, { headers }); 
        alert("Sửa tin tức thành công!");
        setNews((prev) =>
          prev.map((n) => (n._id === editingId ? res.data : n))
        );
      } else {
        // Tạo mới (POST)
        res = await axios.post(`/api/news`, data, { headers }); 
        alert("Tạo tin tức thành công!");
        setNews((prev) => [res.data, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu tin tức! (Kiểm tra lỗi 403 hoặc Backend)");
    }
  };

  //  Xóa tin tức
  const deleteNews = async (id) => { 
    if (!window.confirm("Bạn chắc chắn muốn xóa tin tức này?")) return;

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      // Gọi API DELETE, cần quyền Admin
      await axios.delete(`/api/news/${id}`, { headers }); 

      // Xóa khỏi state
      setNews((prev) => prev.filter((n) => n._id !== id));
      alert("Xóa tin tức thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa tin tức! (Hãy kiểm tra quyền Admin và token)"); 
    }
  };


  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Quản lý Tin Tức</h1>

      {/* FORM TẠO/SỬA (Giữ nguyên phần hiển thị JSX) */}
      <div className="p-4 border rounded mb-5 bg-gray-50">
        <h2 className="font-bold mb-3">
          {editingId ? "Sửa tin tức" : "Tạo tin tức mới"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input 
            className="border p-2 rounded col-span-1 md:col-span-3" 
            placeholder="Tiêu đề tin tức" 
            name="title" 
            value={formData.title} 
            onChange={handleFormChange} 
          />
          <textarea 
            className="border p-2 rounded col-span-1 md:col-span-3 h-32" 
            placeholder="Nội dung tin tức" 
            name="content" 
            value={formData.content} 
            onChange={handleFormChange} 
          ></textarea>
          <input 
            className="border p-2 rounded" 
            placeholder="Tác giả" 
            name="author" 
            value={formData.author} 
            onChange={handleFormChange} 
          />
          
          {/* Input chọn ảnh */}
          <div className="col-span-1 md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện (Tùy chọn)</label>
            <input 
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleFileChange} 
              key={selectedFile || editingId || "file-input"} 
            />
            {selectedFile && <p className="mt-1 text-xs text-gray-500">Đã chọn: **{selectedFile.name}**</p>}
          </div>

        </div>

        <div className="mt-3 flex gap-2">
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition" 
            onClick={saveNews}
          >
            {editingId ? "Lưu thay đổi" : "Đăng tin"}
          </button>
          {editingId && (
            <button 
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition" 
              onClick={resetForm}
            >
              Hủy
            </button>
          )}
        </div>
      </div>

      <hr className="my-5" />

      {/* TABLE HIỂN THỊ (Sử dụng hàm startEdit và deleteNews mới) */}
      <h2 className="text-xl font-bold mb-3">Danh sách Tin Tức</h2>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="w-full border shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left w-1/3">Tiêu đề</th>
              <th className="border p-2 text-left w-1/2">Nội dung (Tóm tắt)</th>
              <th className="border p-2 w-1/12">Tác giả</th>
              <th className="border p-2 w-1/12">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {news.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-3 text-gray-500">
                  Không có tin tức nào.
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="border p-2 text-left font-medium">{item.tieuDe}</td>
                  <td className="border p-2 text-left text-sm text-gray-600">
                    {item.noiDung.substring(0, 100)}{item.noiDung.length > 100 ? "..." : ""}
                  </td>
                  <td className="border p-2 text-center">{item.tacGia || "—"}</td>

                  <td className="border p-2">
                    <div className="flex gap-2 justify-center">
                      <button 
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition" 
                        onClick={() => startEdit(item)}
                      >
                        Sửa
                      </button>
                      <button 
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition" 
                        onClick={() => deleteNews(item._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}