import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormControlLabel,
  Paper
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function RolePermissions() {
    return (
        <div className="p-8 max-w-5xl space-y-8">
            <div>
                <Typography variant="h5" className="font-semibold">User Roles & Permissions</Typography>
                <Typography variant="body2" color="text.secondary">
                    Manage roles, assign granular permissions, and duplicate existing roles
                </Typography>
            </div>

            <div className="space-y-2">
                <Typography className="font-medium">Select Roles</Typography>
                <FormControl fullWidth size="medium">
                    <Select defaultValue="admin">
                        <MenuItem value="admin">Administrator</MenuItem>
                        <MenuItem value="facilitator">Facilitator</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="space-y-2">
                <Typography className="font-medium">Duplicate Role</Typography>
                <div className="flex gap-4">
                    <TextField placeholder="New Role Name" fullWidth />
                    <Button variant="contained" color="success" startIcon={<AddIcon />} className="rounded-xl px-6">
                        Duplicate
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <Typography variant="h6" className="font-semibold">
                    Role Permissions
                </Typography>

                <Paper variant="outlined" className="p-6 space-y-4 border-green-500">
                    <Typography className="font-medium">
                        Learner Queries
                    </Typography>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormControlLabel control={<Checkbox />} label="View all queries"/>
                        <FormControlLabel control={<Checkbox />} label="Reply to queries"/>
                        <FormControlLabel control={<Checkbox />} label="Assign queries"/>
                        <FormControlLabel control={<Checkbox />} label="Mark queries as resolved"/>
                        <FormControlLabel control={<Checkbox />} label="Delete queries"/>
                    </div>
                </Paper>

                <Paper variant="outlined" className="p-4 border-green-500 text-gray-600 font-medium">
                    FAQ Management
                </Paper>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button variant="contained" className="bg-green-200 text-green-900 hover:bg-green-300 rounded-xl px-6">
                    Cancel
                </Button>

                <Button variant="contained" color="success" className="rounded-xl px-6">
                    Save Changes
                </Button>
            </div>
        </div>
    )
}