import React from "react";
import dayjs from "dayjs";

const HOURS = Array.from({ length: 15 }, (_, i) => 7 + i); // 7 → 21

export default function TimetableGrid({ events }) {
  return (
    <div className="timetable">
      {/* Header hàng thứ */}
      <div className="grid grid-cols-8 border-b bg-gray-100">
        <div className="p-2 font-bold">Giờ</div>
        {["T2","T3","T4","T5","T6","T7","CN"].map(d => (
          <div key={d} className="p-2 text-center font-bold border-l">{d}</div>
        ))}
      </div>

      {/* Nội dung */}
      <div className="grid grid-cols-8">
        {HOURS.map(hour => (
          <React.Fragment key={hour}>
            <div className="p-2 border-t font-semibold">{hour}:00</div>

            {[1,2,3,4,5,6,0].map(weekday => {
              const classEvent = events.find(
                ev =>
                  dayjs(ev.date).day() === weekday &&
                  parseInt(ev.startTime.split(":")[0]) === hour
              );

              return (
                <div className="border p-1 h-16 relative" key={weekday}>
                  {classEvent && (
                    <div className="bg-green-500 text-white text-sm p-1 rounded absolute inset-0">
                      {classEvent.courseName}
                      <br />
                      {classEvent.startTime} - {classEvent.endTime}
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
