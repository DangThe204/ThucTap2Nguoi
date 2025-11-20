import React, { useState } from "react";
import "./ExamSchedule.css";

const examData = [
  {
    date: "2025-08-29",
    session: "morning",
    subject: "Trực quan hóa dữ liệu",
    classCode: "22DKTPM1B",
    studentCode: "012307755602",
    period: "2 - 3",
    room: "L.508",
    duration: "90'",
    time: "08h00-09h30"
  },
  {
    date: "2025-08-29",
    session: "morning",
    subject: "Đồ án chuyên ngành phát triển phần mềm",
    classCode: "22DKTPM1D",
    studentCode: "012307750613",
    period: "4 - 4",
    room: "L.608",
    duration: "30'",
    time: "09h45-10h15"
  },
  {
    date: "2025-08-26",
    session: "afternoon",
    subject: "Các công nghệ nền cho hệ thống CNTT",
    classCode: "22DKTPM1B",
    studentCode: "012307750702",
    period: "9 - 10",
    room: "L.504",
    duration: "90'",
    time: "14h45-16h15"
  },
  {
    date: "2025-08-28",
    session: "afternoon",
    subject: "Đảm bảo chất lượng phần mềm",
    classCode: "22DKTPM1B",
    studentCode: "012307750802",
    period: "7 - 8",
    room: "L.604",
    duration: "90'",
    time: "13h00-14h30"
  }
];

const sessions = [
  { key: "morning", label: "Sáng" },
  { key: "afternoon", label: "Chiều" },
  { key: "evening", label: "Tối" }
];

function getWeek(startDate) {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return {
      label: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"][i],
      date: date.toISOString().slice(0, 10)
    };
  });
}

export default function ExamSchedule() {
  // Tuần bắt đầu mặc định (25/8/2025 như dữ liệu mẫu)
  const [weekStart, setWeekStart] = useState(new Date("2025-08-25"));

  const weekDates = getWeek(weekStart);

  const getExams = (date, session) => {
    return examData.filter(e => e.date === date && e.session === session);
  };

  // Chuyển tuần
  const changeWeek = (days) => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() + days);
    setWeekStart(newDate);
  };

  return (
    <div className="exam-wrapper">
      <h2>Lịch Thi</h2>

      {/* Điều khiển tuần */}
      <div className="exam-controls">
        <button onClick={() => setWeekStart(new Date("2025-08-25"))}>📅 Hiện tại</button>
        <button onClick={() => window.print()}>🖨 In lịch</button>
        <button onClick={() => changeWeek(-7)}>⬅ Trở về</button>
        <button onClick={() => changeWeek(7)}>Tiếp ➡</button>
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
                        <b>{ex.subject}</b><br />
                        {ex.classCode} - {ex.studentCode}<br />
                        Tiết: {ex.period}<br />
                        Phòng: {ex.room}<br />
                        Giờ thi: {ex.duration}<br />
                        ({ex.time})
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
  );
}
