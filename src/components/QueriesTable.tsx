interface Query {
  id: string;
  question: string;
  status: string;
  source: string;
  fullname: string | null;
  created_at: string;
  phone: string;
}

function getStatusClasses(status: string) {
  switch (status) {
    case "ESCALATED":
      return "bg-yellow-100 text-yellow-700";
    case "OPEN":
      return "bg-green-100 text-green-700";
    case "CLOSED":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function QueriesTable({ queries }: { queries: Query[] }) {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
      <div className="mb-4 flex flex-col gap-4 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Learner Queries</h3>
          <p className="text-sm text-gray-500">
            Recent learner conversations and response activity.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700">
          Total: {queries.length}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <div className="max-h-[520px] overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-[#fafafa] text-gray-600">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium">Learner Phone</th>
                <th className="px-4 py-3 text-left font-medium">Question</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Source</th>
                <th className="px-4 py-3 text-left font-medium">Assigned Staff</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {queries.map((q) => (
                <tr key={q.id} className="transition hover:bg-gray-50/80">
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                    {q.phone}
                  </td>

                  <td className="max-w-[260px] px-4 py-4 text-gray-600">
                    <p className="line-clamp-2">{q.question}</p>
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

                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {new Date(q.created_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-green-600 transition hover:bg-gray-50 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {!queries.length && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
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