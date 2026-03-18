import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Switch,
  Button
} from "@mui/material";

export default function AssignStaff() {
    return (
        <div className="p-8 max-w-6xl">
            <div className="mb-8">
                <Typography variant="h5" className="font-semibold">
                    Assign Staff
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Select a staff member an an internal note for this query
                </Typography>
            </div>

            <div className="mb-6">
                <Typography className="font-semibold mb-2">
                    Recent Assignees
                </Typography>
            </div>

            <div className="space-y-6">
                <div>
                    <Typography className="font-medium mb-1">
                        Assign To Staff
                    </Typography>
                    <FormControl fullWidth>
                        <Select displayEmpty defaultValue="">
                            <MenuItem value="">
                                <span className="text-gray-400">
                                    Select a staff member
                                </span>
                            </MenuItem>
                            <MenuItem value="staff1">Staff Member 1</MenuItem>
                            <MenuItem value="staff2">Staff Member 2</MenuItem>
                            <MenuItem value="staff3">Staff Member 3</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Typography className="font-medium mb-1">
                        Internal Note (Optional)
                    </Typography>
                    <TextField fullWidth multiline rows={5} placeholder="Add a private note about this assignment..."/>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <Typography className="font-medium">
                        Notify Assignee
                    </Typography>
                    <Switch defaultChecked color="success" />
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-end gap-4">
                    <Button variant="contained" className="bg-green-200 text-green-900 hover:bg-green-300 rounded-xl px-8">
                        Cancel
                    </Button>

                    <Button variant="contained" color="success" className="rounded-xl px-8">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}