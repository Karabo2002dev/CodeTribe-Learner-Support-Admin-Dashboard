import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../api/axios";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface ChartData {
  bucket_day: number;
  percentage: string;
}

export default function DailyQueryChart() {
  // ✅ Default to current month
  const [month, setMonth] = useState(() =>
    dayjs().format("YYYY-MM")
  );

  const [data, setData] = useState<{ day: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const res = await api.get("/queries/trend", {
          params: { month },
        });

        const chartData = res.data.data.map((d: ChartData) => ({
          day: `${d.bucket_day} ${dayjs(month + "-01").format("MMM")}`,
          value: Number(d.percentage),
        }));

        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [month]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">
            Daily Query Volume
          </h3>
          <p className="text-sm text-gray-500">
            Queries received per day
          </p>
        </div>

        {/* MONTH PICKER */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year", "month"]}
            value={dayjs(month + "-01")}
            onChange={(value: Dayjs | null) => {
              if (value) setMonth(value.format("YYYY-MM"));
            }}
            format="MMMM YYYY"
            slotProps={{
              textField: {
                size: "small",
                sx: {
                  width: 170,
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>

      {/* CHART */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading chart...</p>
      ) : (
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                fill="url(#colorGreen)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}