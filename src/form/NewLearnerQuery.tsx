import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel
} from "@mui/material";

export default function NewLearnerQuery() {
    return (
        <div className="p-8 max-w-6xl">
            <div className="mb-8">
                <Typography variant="h5" className="font-semibold">
                    New Learner Query
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Fill in the details to create a new support query for a learner
                </Typography>
            </div>
 
            <div className="space-y-6">
                <div>
                    <Typography className="font-medium mb-1">
                        Learner Full Name
                    </Typography>
                    <TextField fullWidth placeholder="Karabo Kgaphola"/>
                </div>

                <div>
                    <Typography className="font-medium mb-1">
                        Contact Number (WhatsApp Number)
                    </Typography>
                    <TextField fullWidth placeholder="+27123456789"/>
                </div>

                <div>
                    <Typography className="font-medium mb-1">
                        Category
                    </Typography>
                    <FormControl fullWidth>
                        <Select displayEmpty defaultValue="">
                            <MenuItem value="">
                                <span className="text-gray-400">Select Category</span>
                            </MenuItem>
                            <MenuItem value="academic">Academic</MenuItem>
                            <MenuItem value="technical">Technical</MenuItem>
                            <MenuItem value="administrative">Administrative</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Typography className="font-medium mb-1">
                        Description
                    </Typography>
                    <TextField fullWidth multiline rows={5} placeholder="Provide a detailed description of the query..."/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Typography className="font-medium mb-1">
                            Priority
                        </Typography>
                        <FormControl fullWidth>
                            <Select displayEmpty defaultValue="">
                                <MenuItem value="">
                                    <span className="text-gray-400">Select Priority</span>
                                </MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <Typography className="font-medium mb-1">
                            Assigned Staff (optional)
                        </Typography>
                        <FormControl fullWidth>
                            <Select displayEmpty defaultValue="">
                                <MenuItem value="">
                                <span className="text-gray-400">Assign Staff</span>
                                </MenuItem>
                                <MenuItem value="staff1">Staff Member 1</MenuItem>
                                <MenuItem value="staff2">Staff Member 2</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-end gap-4">
                    <Button variant="contained" className="bg-green-200 text-green-900 hover:bg-green-300 rounded-xl px-8">
                        Cancel
                    </Button>

                    <Button variant="contained" color="success" className="rounded-xl px-8">
                        Save Query
                    </Button>
                </div>
            </div>
        </div>
    )
}