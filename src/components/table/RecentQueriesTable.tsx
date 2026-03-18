import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import {
  MoreHoriz,
  Search,
  Tune,
  GridView,
  TableRows,
} from "@mui/icons-material";

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

interface ApiResponse {
  success: boolean;
  message?: string;
  data: Query[];
}

interface ApiErrorResponse {
  message?: string;
}

function getStatusClasses(status: string) {
  switch (status) {
    case "ESCALATED":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "OPEN":
      return "bg-slate-100 text-slate-700 border border-slate-200";
    case "RESOLVED":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-200";
  }
}

export default function RecentQueriesTable() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQueries() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<ApiResponse>("/queries");

        if (!res.data.success) {
          throw new Error(res.data.message || "Failed to fetch queries");
        }

        const sorted = [...res.data.data].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );

        setQueries(sorted);
      } catch (error: unknown) {
        let message = "Failed to fetch queries";

        if (typeof error === "object" && error !== null) {
          const err = error as { response?: { data?: ApiErrorResponse } };

          if (err.response?.data?.message) {
            message = err.response.data.message;
          }
        }

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchQueries();
  }, []);

  const filteredQueries = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) return queries;

    return queries.filter(
      (q) =>
        q.phone.toLowerCase().includes(term) ||
        q.question.toLowerCase().includes(term) ||
        (q.fullname || "").toLowerCase().includes(term) ||
        q.status.toLowerCase().includes(term) ||
        q.source.toLowerCase().includes(term)
    );
  }, [queries, search]);

  if (loading) {
    return (
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="h-[420px] animate-pulse rounded-2xl bg-gray-50" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
        <p className="font-semibold">Error loading queries</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
      <div className="mb-4 flex flex-col gap-4 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">All Queries</h3>
          <p className="text-sm text-gray-500">
            Recent learner conversations and response activity.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
            <Search className="text-gray-400" fontSize="small" />
            <input
              type="text"
              placeholder="Search query..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-[180px] bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <button title="Filter" className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50">
              <Tune fontSize="small" />
            </button>
            <button title="Grid View" className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50">
              <GridView fontSize="small" />
            </button>
            <button title="Table View" className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50">
              <TableRows fontSize="small" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <div className="max-h-[520px] overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-[#fafafa] text-gray-600">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium">Learner Phone</th>
                <th className="px-4 py-3 text-left font-medium">Question</th>
                <th className="px-4 py-3 text-left font-medium">Response</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Source</th>
                <th className="px-4 py-3 text-left font-medium">Assigned Staff</th>
                <th className="px-4 py-3 text-left font-medium">Created On</th>
                <th className="px-4 py-3 text-left font-medium"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredQueries.map((q) => (
                <tr key={q.id} className="transition hover:bg-gray-50/80">
                  <td className="px-4 py-4 font-medium text-gray-900">{q.phone}</td>

                  <td className="max-w-[260px] px-4 py-4 text-gray-600">
                    <p className="line-clamp-2">{q.question}</p>
                  </td>

                  <td className="max-w-[280px] px-4 py-4 text-gray-600">
                    <p className="line-clamp-2">{q.response || "No response yet"}</p>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        q.status
                      )}`}
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
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-4 py-4">
                    <button type="button" title="More options" className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50">
                      <MoreHoriz fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}

              {!filteredQueries.length && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-500">
                    No queries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}