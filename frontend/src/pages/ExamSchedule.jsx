import React, { useEffect, useState } from "react";
import { getExamLopOptions, getPublicExams } from "../api/examPublicApi";

export default function ExamSchedule() {
  const sessions = [
    { key: "morning", label: "Sáng" },
    { key: "afternoon", label: "Chiều" },
    { key: "evening", label: "Tối" }
  ];

  // --- STATE ---
  const [lopOptions, setLopOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [examData, setExamData] = useState([]);

  const [weekStart, setWeekStart] = useState(new Date());
  const weekDates = getWeek(weekStart);

  // ----------------------
  // 1. LOAD LỚP CHÍNH TỪ BACKEND
  // ----------------------
  useEffect(() => {
    getExamLopOptions().then(res => setLopOptions(res.data));
  }, []);

  // ----------------------
  // 2. LOAD EXAM THEO LỚP + TUẦN
  // ----------------------
  useEffect(() => {
    if (!selectedClass) return;

    const tuNgay = weekDates[0].date;
    const denNgay = weekDates[6].date;

    getPublicExams({
      maLopChinh: selectedClass,
      tuNgay,
      denNgay
    }).then(res => {
      setExamData(res.data);
    });
  }, [selectedClass, weekStart]);

  // ----------------------
  // FUNCTION GET WEEK
  // ----------------------
  function getWeek(startDate) {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return {
        label: ["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7","CN"][i],
        date: date.toISOString().slice(0, 10)
      };
    });
  }

  // ----------------------
  // LỌC EXAM THEO NGÀY + CA
  // ----------------------
  const getExams = (date, session) =>
    examData.filter(e => {
      const examDate = e.thoiGianKiemTra.slice(0, 10);
      const hour = new Date(e.thoiGianKiemTra).getHours();

      let sessionKey = "morning";
      if (hour >= 12 && hour < 18) sessionKey = "afternoon";
      else if (hour >= 18) sessionKey = "evening";

      return examDate === date && sessionKey === session;
    });

  // ----------------------
  const changeWeek = (days) => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() + days);
    setWeekStart(newDate);
  };

  // ----------------------
  return (
    <>
      {/* CSS */}
      <style>{`
        .exam-wrapper { padding: 40px; min-height: 100vh; background: linear-gradient(135deg, #eaf1ff, #f7faff); font-family: "Inter"; }
        .exam-wrapper h2 { text-align: center; font-size: 34px; font-weight: 800; color: #21335b; margin-bottom: 25px; }
        .exam-controls { display: flex; gap: 14px; margin-bottom: 22px; justify-content: center; }
        .exam-controls button { background: #203a8f; color: #fff; padding: 11px 20px; border-radius: 10px; font-size: 15px; font-weight: 600; border: none; cursor: pointer; }
        .exam-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; border-radius: 14px; overflow: hidden; }
        .exam-card { background: #fff9c9; border: 1px solid #f2d36a; border-radius: 12px; padding: 10px; margin-bottom: 8px; font-size: 13px; }
      `}</style>

      <div className="exam-wrapper">
        <h2>Lịch Thi</h2>

        {/* CHỌN LỚP CHÍNH */}
        <div className="flex justify-center mb-5">
          <select
            className="p-3 border rounded-lg"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">-- Chọn lớp chính --</option>
            {lopOptions.map((lop, i) => (
              <option key={i} value={lop}>
                {lop}
              </option>
            ))}
          </select>
        </div>

        <div className="exam-controls">
          <button onClick={() => setWeekStart(new Date())}> Tuần này</button>
          <button onClick={() => changeWeek(-7)}>Trở về</button>
          <button onClick={() => changeWeek(7)}>Tiếp</button>
        </div>

        <table className="exam-table">
          <thead>
            <tr>
              <th>Ca học</th>
              {weekDates.map((d, i) => (
                <th key={i}>
                  {d.label}<br />
                  {new Date(d.date).toLocaleDateString("vi-VN")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sessions.map((s, i) => (
              <tr key={i}>
                <td className="session-col">{s.label}</td>
                {weekDates.map((day, j) => {
                  const exams = getExams(day.date, s.key);
                  return (
                    <td key={j} className="cell">
                      {exams.map((ex, k) => (
                        <div key={k} className="exam-card">
                          <b>{ex.courseId.tenMonHoc}</b><br />
                          Lớp HP: {ex.courseId.maLopHocPhan}<br />
                          Phòng: {ex.phong}<br />
                          Hình thức: {ex.hinhThucKiemTra}<br />
                          Thời gian: {new Date(ex.thoiGianKiemTra).toLocaleTimeString("vi-VN")}
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
