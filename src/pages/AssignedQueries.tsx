import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

interface AssignedQuery {
  id: string;
  phone: string;
  question: string;
  status: string;
  created_at: string;
}

export default function AssignedQueries() {
  const [queries, setQueries] = useState<AssignedQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login");
  };

  useEffect(() => {
    const fetchAssignedQueries = async () => {
      try {
        const response = await axios.get("/queries/assigned");
        setQueries(response.data.result);
      } catch (err: any) {
        setError("Failed to fetch assigned queries");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedQueries();
  }, []);

  if (loading) return <p>Loading assigned queries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Assigned Queries</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {queries.length === 0 ? (
        <p>No assigned queries.</p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>Phone</th>
              <th>Question</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.id}>
                <td>{query.phone}</td>
                <td>{query.question}</td>
                <td>{query.status}</td>
                <td>
                  {new Date(query.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}