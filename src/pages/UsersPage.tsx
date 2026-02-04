import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";

export default function UsersPage() {
    return (
        <div className="p-6 space-y-6 max-w-6xl">
            <div className="flex justify-between items-start">
                <div>
                    <Typography variant="h5" className="font-semibold">
                        Users
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage all administrators and facilitators within the CodeTribe
                        Learner Support System
                    </Typography>
                </div>

                <Button variant="contained" color="success" startIcon={<AddIcon />} className="rounded-full px-5">
                    New User
                </Button>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between">
                <TextField size="small" placeholder="Search" className="w-72"/>

                <div className="flex gap-3">
                    <FormControl size="small" className="w-36">
                        <InputLabel>Role</InputLabel>
                        <Select label="Role" defaultValue="all">
                            <MenuItem value="all">All Roles</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="facilitator">Facilitator</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" className="w-36">
                        <InputLabel>Status</InputLabel>
                        <Select label="Status" defaultValue="all">
                            <MenuItem value="all">All Statuses</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="grid grid-cols-6 bg-green-50 px-6 py-3 text-sm font-medium text-gray-600">
                        <span>Name</span>
                        <span>Email</span>
                        <span>Role</span>
                        <span>Status</span>
                        <span>Last Active</span>
                        <span className="text-right">Action</span>
                    </div>

                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="grid grid-cols-6 items-center px-6 py-4 border-t text-sm">
                            <span>Name</span>
                            <span>Email</span>
                            <span>Role</span>
                            <span className="text-green-600 font-medium">Active</span>
                            <span>Last Active</span>
                            <span className="text-right">
                                <IconButton size="small">
                                    <MoreHorizIcon />
                                </IconButton>
                            </span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}