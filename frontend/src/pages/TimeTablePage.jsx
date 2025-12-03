import React, { useState } from "react";
import dayjs from "dayjs";
import TimetableGrid from "../components/TimeTableGrid.jsx";
import useMyTimetable from "../hooks/useMyTimeTable.js";

export default function TimeTablePage() {
  const [weekStart, setWeekStart] = useState(
    dayjs().startOf("week").add(1, "day") // thứ 2 hiện tại
  );

  // hook nên gọi: GET /api/my-timetable?weekStart=...&weekEnd=...
  const { loading, data } = useMyTimetable(
    weekStart.format("YYYY-MM-DD")
  );

  const nextWeek = () =>
    setWeekStart((prev) => prev.add(7, "day"));
  const prevWeek = () =>
    setWeekStart((prev) => prev.subtract(7, "day"));

  const weekEnd = weekStart.add(6, "day");

  return (
    <div>
      <div className="flex justify-between items-center p-3 border-b">
        <button onClick={prevWeek} className="btn">
          ◀ Trước
        </button>

        <h2>
          Tuần: {weekStart.format("DD/MM")} -{" "}
          {weekEnd.format("DD/MM")}
        </h2>

        <button onClick={nextWeek} className="btn">
          Tiếp ▶
        </button>
      </div>

      {loading ? (
        "Đang tải..."
      ) : (
        <TimetableGrid events={data || []} />
      )}
    </div>
  );
}