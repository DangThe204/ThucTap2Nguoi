import React, { useState } from "react";

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

const ThoiKhoaBieu = () => {
  const [weekOffset, setWeekOffset] = useState(0);

  // Lấy thứ 2 của tuần hiện tại
  const getMonday = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff + weekOffset * 7));
  };

  const monday = getMonday();

  // Tạo danh sách 7 ngày (Thứ 2 → CN)
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

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
            {days.map((_, idx) => (
              <td key={idx} style={tdStyle}>
                {weekOffset === 0 && idx === 1 && (
                  <div style={monHocStyle}>
                    Đảm bảo chất lượng phần mềm<br />
                    Lớp: CNTT2025A<br />
                    Tiết: 1 - 3<br />
                    Phòng: L604
                  </div>
                )}

                {weekOffset === 0 && idx === 4 && (
                  <div style={monHocStyle}>
                    Cơ sở dữ liệu nâng cao<br />
                    Lớp: CNTT2025A<br />
                    Tiết: 1 - 5<br />
                    Phòng: L501
                  </div>
                )}
              </td>
            ))}
          </tr>

          {/* Chiều */}
          <tr>
            <td style={caStyle}>Chiều</td>
            {days.map((_, idx) => (
              <td key={idx} style={tdStyle}>
                {weekOffset === 0 && idx === 0 && (
                  <div style={monHocStyle}>
                    Lập trình Web<br />
                    Lớp: CNTT2025A<br />
                    Tiết: 7 - 11<br />
                    Phòng: L504
                  </div>
                )}

                {weekOffset === 0 && idx === 2 && (
                  <div style={monHocStyle}>
                    Đảm bảo chất lượng phần mềm<br />
                    Lớp: CNTT2025A<br />
                    Tiết: 7 - 9<br />
                    Phòng: L604
                  </div>
                )}

                {weekOffset === 0 && idx === 4 && (
                  <div style={monHocStyle}>
                    Đồ án phát triển phần mềm<br />
                    Lớp: CNTT2025A<br />
                    Tiết: 7 - 11<br />
                    Phòng: L608
                  </div>
                )}
              </td>
            ))}
          </tr>

          {/* Tối */}
          <tr>
            <td style={caStyle}>Tối</td>
            {days.map((_, idx) => (
              <td key={idx} style={tdStyle}></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

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
  height: "120px",
  padding: "6px",
};

const caStyle = {
  background: "#fffacd",
  width: "70px",
  fontWeight: "bold",
  textAlign: "center",
  border: "1px solid #ccc",
};

const monHocStyle = {
  background: "#fff4a8",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #e0d27f",
  fontSize: "14px",
};

export default ThoiKhoaBieu;
