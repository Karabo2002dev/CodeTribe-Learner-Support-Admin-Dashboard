import { useEffect, useState } from "react";
import {
  QuestionAnswer,
  OpenInNew,
  CheckCircle,
} from "@mui/icons-material";

import api from "../../api/axios";

interface Stats {
  totalQueries: number;
  openedQueries: number;
  resolvedQueries: number;
}

export default function StatCard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await api.get("/queries/stats");
         console.log("Fetched stats:", data);
        setStats(data.data);
       
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading stats...</p>;
  }

  if (!stats) {
    return <p className="text-red-500">Failed to load stats</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-green-100 rounded-2xl p-6 shadow-sm relative">
        <QuestionAnswer className="absolute top-5 right-5 text-green-700" />
        <p className="text-sm text-gray-600 mb-2">Total Queries</p>
        <h2 className="text-3xl font-semibold text-gray-900">
          {stats.totalQueries}
        </h2>
        <p className="text-xs text-gray-600 mt-2">
          Total Queries Received
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm relative">
        <OpenInNew className="absolute top-5 right-5 text-gray-400" />
        <p className="text-sm text-gray-600 mb-2">Opened Queries</p>
        <h2 className="text-3xl font-semibold text-gray-900">
          {stats.openedQueries}
        </h2>
        <p className="text-xs text-gray-600 mt-2">
          Currently Unresolved
        </p>
      </div>

      <div className="bg-green-100 rounded-2xl p-6 shadow-sm relative">
        <CheckCircle className="absolute top-5 right-5 text-green-700" />
        <p className="text-sm text-gray-600 mb-2">Resolved Queries</p>
        <h2 className="text-3xl font-semibold text-gray-900">
          {stats.resolvedQueries}
        </h2>
        <p className="text-xs text-gray-600 mt-2">
          Successfully Closed
        </p>
      </div>

    </div>
  );
}
