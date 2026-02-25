import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Query {
  id: string;
  question: string;
  response: string | null;
  source: string;
  fullname: string | null;
  created_at: string;
  phone: string;
  status: string;
}

export default function RecentQueriesTable() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQueries() {
      try {
        setLoading(true);
        const res = await api.get("/queries");

        // Ensure correct data shape
        const data: Query[] = res.data.data ?? res.data;

        // Sort newest first
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );

        setQueries(sorted);
      } catch (err) {
        console.error("Failed to fetch queries", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQueries();
  }, []);

  if (loading) {
    return <p className="text-gray-500 mt-4">Loading queries...</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
      <h3 className="font-semibold text-gray-900 mb-4">
        Learner Queries
      </h3>

      {/* SCROLLABLE CONTAINER */}
      <div className="border border-green-200 rounded-xl max-h-[420px] overflow-y-auto">
        <table className="min-w-full text-sm">
          {/* STICKY HEADER */}
          <thead className="bg-green-100 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Learner Phone</th>
              <th className="px-4 py-3 text-left font-medium">Question</th>
              <th className="px-4 py-3 text-left font-medium">Response</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Source</th>
              <th className="px-4 py-3 text-left font-medium">Assigned Staff</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-green-200">
            {queries.map((q) => (
              <tr
                key={q.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 text-gray-900">{q.phone}</td>

                <td className="px-4 py-4 text-gray-600">
                  {q.question}
                </td>

                <td className="px-4 py-4 text-gray-600">
                  {q.response || "No response yet"}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      q.status === "ESCALATED"
                        ? "bg-yellow-100 text-yellow-700"
                        : q.status === "OPEN"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {q.status}
                  </span>
                </td>

                <td className="px-4 py-4 text-gray-600">{q.source}</td>

                <td className="px-4 py-4 text-gray-600">
                  {q.fullname || "Unassigned"}
                </td>

                <td className="px-4 py-4 text-gray-600">
                  {new Date(q.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
