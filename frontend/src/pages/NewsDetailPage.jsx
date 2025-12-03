// File: NewsDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function NewsDetailPage() {
  const { id } = useParams(); // Lấy ID (hoặc slug) từ URL
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        // Gọi API với ID (hoặc slug)
        const res = await axios.get(`/api/news/${id}`); 
        setNewsDetail(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy chi tiết tin tức:', err);
        setError('Không thể tải chi tiết tin tức. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return <div className="p-5 text-center">Đang tải chi tiết tin tức...</div>;
  }

  if (error || !newsDetail) {
    return <div className="p-5 text-center text-red-500">{error || 'Không tìm thấy tin tức này.'}</div>;
  }

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="border p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">{newsDetail.tieuDe}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Đăng bởi: <span className="font-medium">{newsDetail.tacGia || 'Admin'}</span> | 
          Ngày: {new Date(newsDetail.createdAt).toLocaleDateString('vi-VN')}
        </p>
        <div className="prose max-w-none text-gray-800 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
          {/* Hiển thị nội dung, sử dụng pre-wrap để giữ định dạng xuống dòng */}
          {newsDetail.noiDung}
        </div>
      </div>
    </div>
  );
}