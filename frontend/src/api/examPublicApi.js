import api from "./axiosConfig";

// Lấy danh sách lớp chính có lịch thi
export const getExamLopOptions = () => api.get("/exams/public/lop-options");

// Lấy lịch thi theo lớp + ngày
export const getPublicExams = (params) =>
  api.get("/exams/public", { params });
