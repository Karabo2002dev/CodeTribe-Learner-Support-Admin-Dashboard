import { TextField, MenuItem } from "@mui/material";

const QueryFilters = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
            <TextField fullWidth placeholder="Search queries" size="small"/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField select size="small" label="Status">
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                </TextField>

                <TextField select size="small" label="Category">
                    <MenuItem value="">All</MenuItem>
                </TextField>

                <TextField select size="small" label="Assign Staff">
                    <MenuItem value="">All</MenuItem>
                </TextField>

                <TextField size="small" label="Date Range" type="date" InputLabelProps={{ shrink: true }}/>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button className="px-5 py-2 rounded-full border border-gray-300 text-sm">
                    Assign
                </button>

                <button className="px-5 py-2 rounded-full border border-gray-300 text-sm">
                    Mark As Resolved
                </button>

                <button className="px-5 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700">
                    Export
                </button>
            </div>
        </div>
    )
}

export default QueryFilters;