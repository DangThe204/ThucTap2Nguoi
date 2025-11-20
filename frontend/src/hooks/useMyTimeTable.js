export default function useMyTimetable(weekStart) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios.get("/api/my-timetable", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      setData(res.data);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });

  }, [weekStart]);

  return { loading, data, error };
}
