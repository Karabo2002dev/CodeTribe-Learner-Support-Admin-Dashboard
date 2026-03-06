import { TextField, MenuItem, Button } from "@mui/material";

interface Filters {
  search: string;
  status: string;
  source: string; // renamed from category
  assignedStaff: string;
  date: string;
}

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const QueryFilters = ({ filters, setFilters }: Props) => {
  const handleChange = (field: keyof Filters) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
      {/* SEARCH */}
      <TextField
        fullWidth
        placeholder="Search by question or phone..."
        size="small"
        value={filters.search}
        onChange={handleChange("search")}
      />

      {/* FILTER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 ">
        {/* STATUS */}
        <TextField
          select
          size="small"
          label="Status"
          value={filters.status}
          onChange={handleChange("status")}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="OPEN">Open</MenuItem>
          <MenuItem value="RESOLVED">Resolved</MenuItem>
        </TextField>

        {/* SOURCE */}
        <TextField
          select
          size="small"
          label="Source"
          value={filters.source}
          onChange={handleChange("source")}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="WHATSAPP">WhatsApp</MenuItem>
          <MenuItem value="WEB">Web</MenuItem>
        </TextField>

        {/* ASSIGNED STAFF */}
        <TextField
          select
          size="small"
          label="Assigned Staff"
          value={filters.assignedStaff}
          onChange={handleChange("assignedStaff")}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Mpho">Mpho</MenuItem>
          <MenuItem value="Karabo">Karabo</MenuItem>
        </TextField>

        {/* DATE */}
        <TextField
          size="small"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={filters.date}
          onChange={handleChange("date")}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end">
        <Button
          variant="outlined"
          size="small"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default QueryFilters;