

interface Query {
  id: string;
  question: string;
  status: string;
  source: string;
  fullname: string | null;
  created_at: string;
  phone: string;
}

export default function QueriesTable({ queries }: { queries: Query[] }) {

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
      <h3 className="font-semibold text-gray-900 mb-4">
        Learner Queries
      </h3>

      {/* Scroll wrapper */}
      <div className="border border-green-200 rounded-xl overflow-x-auto max-h-[420px]">
        <table className="min-w-full text-sm">
          {/* Sticky header */}
          <thead className="bg-green-100 sticky top-0 z-10">
            <tr className="text-gray-700">
              <th className="px-4 py-3 text-left font-medium">
                Learner Phone
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Question
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Source
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Assigned Staff
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Date
              </th>
              <th className="px-4 py-3 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-green-200">
            {queries.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-10 text-gray-500"
                >
                  No queries available
                </td>
              </tr>
            )}

            {queries.map((q) => (
              <tr
                key={q.id}
                className="hover:bg-green-50 transition"
              >

                <td className="px-4 py-4 text-gray-900">
                  {q.phone}
                </td>

                {/* Truncated long text */}
                <td className="px-4 py-4 text-gray-600 max-w-[320px] truncate">
                  {q.question}
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

                <td className="px-4 py-4 text-gray-600">
                  {q.source}
                </td>

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

                <td className="px-4 py-4 text-right">
                  <button className="text-green-600 text-xs font-medium hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}