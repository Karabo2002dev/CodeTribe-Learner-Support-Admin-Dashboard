import { TextField, MenuItem, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

interface Filters {
  search: string;
  status: string;
  source: string;
  assignedStaff: string;
  date: string;
}

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const QueryFilters = ({ filters, setFilters }: Props) => {
  const handleChange =
    (field: keyof Filters) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | { target: { value: string } }
    ) => {
      setFilters((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleReset = () => {
    setFilters({
      search: "",
      status: "",
      source: "",
      assignedStaff: "",
      date: "",
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700">
          <TuneIcon fontSize="small" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Filter Queries</h3>
          <p className="text-sm text-gray-500">
            Narrow results by status, source, assigned staff, or date.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <TextField
          fullWidth
          size="small"
          placeholder="Search by question or phone..."
          value={filters.search}
          onChange={handleChange("search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9ca3af", fontSize: 20 }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "14px",
              backgroundColor: "#fff",
            },
          }}
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TextField
          select
          size="small"
          label="Status"
          value={filters.status}
          onChange={handleChange("status")}
          InputProps={{
            sx: {
              borderRadius: "14px",
              backgroundColor: "#fff",
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="OPEN">Open</MenuItem>
          <MenuItem value="ESCALATED">Escalated</MenuItem>
          <MenuItem value="RESOLVED">Resolved</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Source"
          value={filters.source}
          onChange={handleChange("source")}
          InputProps={{
            sx: {
              borderRadius: "14px",
              backgroundColor: "#fff",
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="WHATSAPP">WhatsApp</MenuItem>
          <MenuItem value="WEB">Web</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Assigned Staff"
          value={filters.assignedStaff}
          onChange={handleChange("assignedStaff")}
          InputProps={{
            sx: {
              borderRadius: "14px",
              backgroundColor: "#fff",
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Mpho">Mpho</MenuItem>
          <MenuItem value="Karabo">Karabo</MenuItem>
        </TextField>

        <TextField
          size="small"
          label="Date"
          type="date"
          value={filters.date}
          onChange={handleChange("date")}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            sx: {
              borderRadius: "14px",
              backgroundColor: "#fff",
            },
          }}
        />
      </div>

      {/* Actions */}
      <div className="mt-5 flex justify-end">
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            borderColor: "#d1d5db",
            color: "#374151",
            px: 2.5,
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
            },
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default QueryFilters;