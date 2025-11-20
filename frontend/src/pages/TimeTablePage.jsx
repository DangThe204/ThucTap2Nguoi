import dayjs from "dayjs";
import useMyTimetable from "../hooks/useMyTimeTable.js";

export default function TimeTablePage() {
  const studentId = "2200006158";

  const [weekStart, setWeekStart] = useState(
    dayjs().startOf("week").add(1, "day") // Thứ 2
  );

  const { loading, data } = useMyTimetable(studentId, weekStart.format("YYYY-MM-DD"));

  const nextWeek = () => setWeekStart(prev => prev.add(7, "day"));
  const prevWeek = () => setWeekStart(prev => prev.subtract(7, "day"));

  return (
    <div>
      <div className="flex justify-between items-center p-3 border-b">
        <button onClick={prevWeek} className="btn">◀ Trước</button>

        <h2>
          Tuần: {weekStart.format("DD/MM")} - {weekStart.add(6, "day").format("DD/MM")}
        </h2>

        <button onClick={nextWeek} className="btn">Tiếp ▶</button>
      </div>

      {loading ? "Đang tải..." : <TimetableGrid events={data} />}
    </div>
  );
}
