import api from "./axiosConfig";

export const adminGetExams = () => api.get("/exams");
export const adminCreateExam = (data) => api.post("/exams", data);
export const adminUpdateExam = (id, data) => api.put(`/exams/${id}`, data);
export const adminDeleteExam = (id) => api.delete(`/exams/${id}`);
