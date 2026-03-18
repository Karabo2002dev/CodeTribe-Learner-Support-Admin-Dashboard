import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../../api/axios";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { CalendarTodayOutlined, ShowChartOutlined } from "@mui/icons-material";

interface ChartData {
  bucket_day: number;
  percentage: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data: ChartData[];
}

interface ApiErrorResponse {
  message?: string;
}

export default function DailyQueryChart() {
  const [month, setMonth] = useState(() => dayjs().format("YYYY-MM"));
  const [data, setData] = useState<{ day: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<ApiResponse>("/queries/trend", {
          params: { month },
        });

        if (!res.data.success) {
          throw new Error(res.data.message || "Failed to load query trend");
        }

        const chartData = res.data.data.map((d) => ({
          day: `${d.bucket_day} ${dayjs(month + "-01").format("MMM")}`,
          value: Number(d.percentage),
        }));

        setData(chartData);
      } catch (error: unknown) {
        let message = "Failed to fetch chart data";

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

    fetchData();
  }, [month]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700">
              <ShowChartOutlined fontSize="small" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Daily Query Volume
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            Daily overview of learner query activity for the selected month.
          </p>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year", "month"]}
            value={dayjs(month + "-01")}
            onChange={(value: Dayjs | null) => {
              if (value) setMonth(value.format("YYYY-MM"));
            }}
            format="MMMM YYYY"
            slots={{
              openPickerIcon: CalendarTodayOutlined,
            }}
            slotProps={{
              textField: {
                size: "small",
                sx: {
                  width: 190,
                  backgroundColor: "#fff",
                  borderRadius: "14px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>

      {loading && (
        <div className="h-[280px] animate-pulse rounded-2xl bg-gray-50" />
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
          <p className="font-semibold">Error loading query trend</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="queryFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111827" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#111827" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
                  fontSize: "12px",
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#111827"
                fill="url(#queryFill)"
                strokeWidth={2.2}
                dot={false}
                activeDot={{ r: 5, fill: "#111827" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}