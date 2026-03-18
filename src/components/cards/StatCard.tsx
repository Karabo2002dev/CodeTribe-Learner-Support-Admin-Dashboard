import { useEffect, useState } from "react";
import {
  QuestionAnswerOutlined,
  OpenInNewOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";
import api from "../../api/axios";

interface Stats {
  totalQueries: number;
  openedQueries: number;
  resolvedQueries: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data: Stats;
}

interface ApiErrorResponse {
  message?: string;
}

type CardItem = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
};

function DashboardMetricCard({ title, value, subtitle, icon }: CardItem) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700">
          {icon}
        </div>
      </div>

      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

export default function DashboardCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await api.get<ApiResponse>("/queries/stats");

        if (!data.success) {
          throw new Error(data.message || "Failed to load statistics");
        }

        setStats(data.data);
      } catch (error: unknown) {
        let message = "Failed to load dashboard statistics";

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

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-[140px] animate-pulse rounded-2xl border border-gray-200 bg-white"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
        <p className="font-semibold">Error loading dashboard statistics</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <DashboardMetricCard
        title="Total Queries"
        value={stats.totalQueries}
        subtitle="All learner queries received"
        icon={<QuestionAnswerOutlined fontSize="small" />}
      />

      <DashboardMetricCard
        title="Opened Queries"
        value={stats.openedQueries}
        subtitle="Currently awaiting resolution"
        icon={<OpenInNewOutlined fontSize="small" />}
      />

      <DashboardMetricCard
        title="Resolved Queries"
        value={stats.resolvedQueries}
        subtitle="Queries successfully closed"
        icon={<CheckCircleOutlineOutlined fontSize="small" />}
      />
    </div>
  );
}