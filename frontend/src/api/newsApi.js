import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:8080/api', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // Thêm Auth Token nếu cần, nhưng đối với public news thì không cần thiết
  },
});

/**
 * Hàm gọi API lấy chi tiết tin tức theo slug.
 * @param {string} slug - Slug (hoặc ID) của tin tức.
 * @returns {Promise<object>} Dữ liệu chi tiết tin tức.
 */
export const getNewsDetailBySlug = async (slug) => {
  try {
    // API GET /api/news/:slug
    const response = await API.get(`/news/${slug}`);
    return response.data; // Trả về dữ liệu tin tức thật
  } catch (error) {
    console.error(`[News API Error] Không thể tải chi tiết tin tức ${slug}:`, error);
    // Nếu lỗi 404 (Not Found) hoặc lỗi khác, hàm này sẽ ném ra lỗi
    throw error;
  }
};