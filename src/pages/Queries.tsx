import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import QueryFilters from "../components/QueryFilters";
import QueriesTable from "../components/QueriesTable";
import FeedbackPopup from "../components/FeedbackPopUp";
import type { AxiosError } from "axios";

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
  source: string;
  assignedStaff: string;
  date: string; // yyyy-mm-dd
}

export default function Queries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    source: "",
    assignedStaff: "",
    date: "",
  });

  // Feedback popup state
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [popupSeverity, setPopupSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  // Fetch all queries
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true);
        const res = await api.get<{ data: Query[] }>("/queries"); // typed response
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        setQueries(data);

        setPopupMessage("Queries loaded successfully.");
        setPopupSeverity("success");
        setPopupOpen(true);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        console.error("Failed to fetch queries:", err);

        setQueries([]);
        setPopupMessage(
          err.response?.data?.message || "Failed to load queries."
        );
        setPopupSeverity("error");
        setPopupOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  // Filtered queries based on active filters
  const filteredQueries = useMemo(() => {
    return queries.filter((query) => {
      const matchesSearch =
        !filters.search ||
        query.question.toLowerCase().includes(filters.search.toLowerCase()) ||
        query.phone.includes(filters.search);

      const matchesStatus = !filters.status || query.status === filters.status;
      const matchesSource = !filters.source || query.source === filters.source;
      const matchesStaff =
        !filters.assignedStaff || query.fullname === filters.assignedStaff;
      const matchesDate =
        !filters.date || query.created_at.slice(0, 10) === filters.date;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource &&
        matchesStaff &&
        matchesDate
      );
    });
  }, [queries, filters]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Queries</h1>

      <QueryFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <p className="text-gray-500">Loading queries...</p>
      ) : filteredQueries.length > 0 ? (
        <QueriesTable queries={filteredQueries} />
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No queries found with the selected filters.
        </p>
      )}

      <FeedbackPopup
        open={popupOpen}
        message={popupMessage}
        severity={popupSeverity}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  );
}