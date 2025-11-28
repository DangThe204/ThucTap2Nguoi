import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function useMyTimetable(weekStartStr, studentId) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!weekStartStr || !studentId) return;

    const weekStart = dayjs(weekStartStr);
    const weekEnd = weekStart.add(6, "day").format("YYYY-MM-DD");

    setLoading(true);

    axios
      .get("/api/my-timetable", {
        params: {
          weekStart: weekStartStr,
          weekEnd: weekEnd,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // backend trả về { schedules: [...] }
        setData(res.data.schedules || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [weekStartStr, studentId]);

  return { loading, data, error };
}
