import { useEffect, useState } from "react";
import api from "../api/axios";

interface Query {
  id: string;
  question: string;
  response: string | null;
  source: string;
  fullname: string | null;
  created_at: string;
  phone: string;
}

const QueriesTable = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQueries() {
      try {
        setLoading(true);
        const res = await api.get("/queries"); // fetch from backend
        setQueries(res.data.data);
      } catch (err) {
        console.error("Failed to fetch queries", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQueries();
  }, []);

  if (loading) return <p className="text-gray-500 mt-4">Loading queries...</p>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-50 h-14 text-sm text-gray-600">
            <th className="w-12 text-center">
              <input type="checkbox" className="h-4 w-4" />
            </th>
            <th className="text-left">Learner Phone</th>
            <th className="text-left">Question</th>
            <th className="text-left">Status</th>
            <th className="text-left">Source</th>
            <th className="text-left">Assigned Staff</th>
            <th className="text-left">Last Updated</th>
            <th className="text-right pr-6">Actions</th>
          </tr>
        </thead>

        <tbody>
          {queries.map((q) => (
            <tr
              key={q.id}
              className="h-14 border-b border-green-200 text-sm hover:bg-green-50"
            >
              <td className="w-12 text-center align-middle">
                <input type="checkbox" className="h-4 w-4" />
              </td>

              <td>{q.phone}</td>
              <td>{q.question}</td>

              <td>
                <span
                  className={`inline-flex items-center justify-center min-w-[64px] px-3 py-1 text-xs font-medium rounded-full ${
                    q.response
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {q.response ? "Resolved" : "Open"}
                </span>
              </td>

              <td>{q.source}</td>
              <td>{q.fullname || "Unassigned"}</td>
              <td>{new Date(q.created_at).toLocaleString()}</td>

              <td className="text-right pr-6 text-green-600 font-medium cursor-pointer">
                View
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueriesTable;
