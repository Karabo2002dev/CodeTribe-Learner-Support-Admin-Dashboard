import QueryFilters from "../components/QueryFilters";
import QueriesTable from "../components/QueriesTable";
import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";

interface Query {
  id: string;
  question: string;
  status: string;
  source: string;
  fullname: string | null;
  created_at: string;
  phone: string;
}

interface Filters {
  search: string;
  status: string;
  source: string; // maps to "source"
  assignedStaff: string;
  date: string;
}

export default function Queries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    source: "",
    assignedStaff: "",
    date: "",
  });

  // ✅ FETCH QUERIES
  useEffect(() => {
    async function fetchQueries() {
      try {
        setLoading(true);
        const res = await api.get("/queries");
        console.log("Fetched queries:", res.data);
        setQueries(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch queries", err);
        setQueries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchQueries();
  }, []);

  // ✅ FILTER LOGIC (Corrected)
  const filteredQueries = useMemo(() => {
    return queries.filter((query) => {
      // 🔎 Search (question + phone)
      const matchesSearch =
        !filters.search ||
        query.question
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        query.phone.includes(filters.search);

      // 📌 Status
      const matchesStatus =
        !filters.status || query.status === filters.status;

      // 📂 Source (category → source)
      const matchesSource =
        !filters.source || query.source === filters.source;

      // 👤 Assigned Staff
      const matchesStaff =
        !filters.assignedStaff ||
        query.fullname === filters.assignedStaff;

      // 📅 Date (created_at)
      const matchesDate =
        !filters.date ||
        new Date(query.created_at).toISOString().slice(0, 10) ===
          filters.date;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource &&
        matchesStaff &&
        matchesDate
      );
    });
  }, [queries, filters]);

  console.log("Applied Filters:", filters);
  console.log("Total Queries:", queries);
  console.log("Filtered Queries:", filteredQueries);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold mb-6">Queries</h1>

      <QueryFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <p className="text-gray-500">Loading queries...</p>
      ) : (
        <QueriesTable queries={filteredQueries} />
      )}
    </div>
  );
}