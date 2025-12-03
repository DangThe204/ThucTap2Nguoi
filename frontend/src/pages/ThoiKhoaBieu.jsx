import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

/* Format ngày dd/mm/yyyy */
const formatDate = (d) => {
  return (
    ("0" + d.getDate()).slice(-2) +
    "/" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "/" +
    d.getFullYear()
  );
};

// 🎯 Hàm check event động có rơi vào đúng ô (ngày + tiết)
function matchDynamicEvent(events, dateObj, tiet) {
  const day = dayjs(dateObj).format("YYYY-MM-DD");

  return events.filter(
    (ev) =>
      ev.date === day &&
      tiet >= ev.startTiet &&
      tiet <= ev.endTiet
  );
}

const ThoiKhoaBieu = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [dynamicEvents, setDynamicEvents] = useState([]); // ⭐ lưu lịch động

  // ⭐ Lấy Monday của tuần hiện tại
  const getMonday = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff + weekOffset * 7));
  };

  const monday = getMonday();

  // ⭐ Tạo danh sách 7 ngày (T2 → CN)
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  // ⭐ Lấy dynamic events từ API
  useEffect(() => {
    const weekStart = dayjs(monday).format("YYYY-MM-DD");
    const weekEnd = dayjs(monday).add(6, "day").format("YYYY-MM-DD");

    axios
      .get("/api/my-timetable", {
        params: { weekStart, weekEnd },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDynamicEvents(res.data.schedules || []);
      })
      .catch((err) => console.error("Lỗi load lịch động:", err));
  }, [weekOffset]);

  // ===========================
  // ⭐ Render từng ô tiết học
  // ===========================
  const renderTietCell = (dayObj, tiet) => {
    const dynamicItems = matchDynamicEvent(dynamicEvents, dayObj, tiet);

    return (
      <td style={tdStyle}>
        {/* ================== LỊCH ĐỘNG ================== */}
        {dynamicItems.map((ev, index) => (
          <div
            key={index}
            style={{
              background: "#4a90e2",
              color: "white",
              padding: "6px",
              borderRadius: "6px",
              marginTop: "5px",
              fontSize: "13px",
              lineHeight: "18px",
            }}
          >
            {ev.courseName}  
            <br />
            Tiết {ev.startTiet} - {ev.endTiet}
            <br />
            Phòng: {ev.phongHoc}
          </div>
        ))}
      </td>
    );
  };

  return (
    <div style={{ background: "white", padding: "20px" }}>
      {/* Nút điều hướng tuần */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button style={buttonStyle} onClick={() => setWeekOffset(0)}>
          📅 Hiện tại
        </button>

        <button style={buttonStyle} onClick={() => window.print()}>
          🖨 In lịch
        </button>

        <button style={buttonStyle} onClick={() => setWeekOffset(weekOffset - 1)}>
          ⬅ Trở về
        </button>

        <button style={buttonStyle} onClick={() => setWeekOffset(weekOffset + 1)}>
          Tiếp ➡
        </button>
      </div>

      {/* Header */}
      <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
        Lịch học - Khoa CNTT
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Ca học</th>
            {days.map((d, idx) => (
              <th style={thStyle} key={idx}>
                {["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7","CN"][idx]}
                <br /> {formatDate(d)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Sáng */}
          <tr>
            <td style={caStyle}>Sáng</td>
            {days.map((_, idx) => renderTietCell(days[idx], 1))}
          </tr>

          {/* Chiều */}
          <tr>
            <td style={caStyle}>Chiều</td>
            {days.map((_, idx) => renderTietCell(days[idx], 7))}
          </tr>

          {/* Tối */}
          <tr>
            <td style={caStyle}>Tối</td>
            {days.map((_, idx) => renderTietCell(days[idx], 13))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// =====================
// CSS
// =====================
const buttonStyle = {
  background: "#0a2e73",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  fontSize: "14px",
  cursor: "pointer",
};

const thStyle = {
  background: "#0a2e73",
  color: "white",
  textAlign: "center",
  padding: "12px",
  border: "1px solid #ccc",
};

const tdStyle = {
  border: "1px solid #ccc",
  verticalAlign: "top",
  height: "130px",
  padding: "6px",
};

const caStyle = {
  background: "#fffacd",
  width: "70px",
  fontWeight: "bold",
  textAlign: "center",
  border: "1px solid #ccc",
};

export default ThoiKhoaBieu;
