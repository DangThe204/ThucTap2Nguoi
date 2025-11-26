import React from "react";
import dayjs from "dayjs";

// 11–15 tiết tuỳ ní, tạm để 11
const TIETS = Array.from({ length: 11 }, (_, i) => i + 1);

// Tính giờ bắt đầu mỗi tiết (tiết 1 = 7:00, mỗi tiết 50 phút)
const getTimeRangeOfTiet = (tiet) => {
  const start = dayjs("07:00", "HH:mm").add((tiet - 1) * 50, "minute");
  const end = start.add(50, "minute");
  return `${start.format("HH:mm")} - ${end.format("HH:mm")}`;
};

// events: [{ date:'YYYY-MM-DD', startTiet, endTiet, courseName }]
export default function TimetableGrid({ events = [] }) {
  return (
    <div className="timetable">
      {/* Header hàng thứ */}
      <div className="grid grid-cols-8 border-b bg-gray-100">
        <div className="p-2 font-bold">Tiết</div>
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
          <div
            key={d}
            className="p-2 text-center font-bold border-l"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Nội dung */}
      <div className="grid grid-cols-8">
        {TIETS.map((tiet) => (
          <React.Fragment key={tiet}>
            {/* Cột tiết + giờ */}
            <div className="p-2 border-t font-semibold text-sm">
              Tiết {tiet}
              <br />
              <span className="text-xs text-gray-500">
                {getTimeRangeOfTiet(tiet)}
              </span>
            </div>

            {/* 7 cột thứ trong tuần */}
            {[1, 2, 3, 4, 5, 6, 0].map((weekday) => {
              const classEvent = events.find((ev) => {
                const evDay = dayjs(ev.date).day(); // 0=CN
                return (
                  evDay === weekday &&
                  tiet >= ev.startTiet &&
                  tiet <= ev.endTiet
                );
              });

              return (
                <div
                  className="border p-1 h-16 relative"
                  key={weekday}
                >
                  {classEvent && (
                    <div className="bg-green-500 text-white text-xs p-1 rounded absolute inset-0 overflow-hidden">
                      <div className="font-semibold truncate">
                        {classEvent.courseName}
                      </div>
                      <div>
                        Tiết {classEvent.startTiet} -{" "}
                        {classEvent.endTiet}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}