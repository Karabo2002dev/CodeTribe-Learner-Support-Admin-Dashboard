import {
  Card,
  CardContent,
  Typography,
  TextField,
  Switch,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Slider
} from "@mui/material";

export default function SettingsPage() {
    return (
        <div className="p-6 space-y-8 max-w-5xl">
            <Typography variant="h5" className="font-semibold">
                Settings
            </Typography>

            <Card>
                <CardContent className="space-y-4">
                    <div>
                        <Typography variant="h6">WhatsApp Chatbot Integration</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Configure the connection and behaviour
                        </Typography>
                    </div>

                    <TextField fullWidth size="small" label="WhatsApp API Key" placeholder="Enter API key"/>

                    <TextField fullWidth size="small" label="Webhook URL" value="https://codetribe.com/webhook/whatsapp"/>

                    <div className="flex items-center justify-between border rounded-md px-4 py-3">
                        <div>
                            <Typography className="text-sm font-medium">
                                Enable Chatbot
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Turn the WhatsApp chatbot on or off
                            </Typography>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <TextField fullWidth size="small" label="Default Welcome Message" value="Hello, Welcome to CodeTribe. How can I help you today?"/>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outlined" size="small">
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" size="small">
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4">
                    <div>
                        <Typography variant="h6">Notification Preferences</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Control how and when alerts are sent
                        </Typography>
                    </div>

                    <div className="flex items-center justify-between">
                        <Typography>Email for New Queries</Typography>
                        <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <Typography>In-App Query Updates</Typography>
                        <Switch defaultChecked />
                    </div>

                    <FormControl fullWidth size="small">
                        <InputLabel>Notification Sound</InputLabel>
                        <Select label="Notification Sound" defaultValue="default">
                            <MenuItem value="default">Default</MenuItem>
                            <MenuItem value="chime">Chime</MenuItem>
                            <MenuItem value="alert">Alert</MenuItem>
                        </Select>
                    </FormControl>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outlined" size="small">
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" size="small">
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4">
                    <div>
                        <Typography variant="h6">Roles & Permissions</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Manage access levels for users
                        </Typography>
                    </div>

                    <FormControl fullWidth size="small">
                        <InputLabel>Default Role</InputLabel>
                        <Select label="Default Role" defaultValue="facilitator">
                            <MenuItem value="facilitator">Facilitator</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="viewer">Viewer</MenuItem>
                        </Select>
                    </FormControl>

                    <div className="grid grid-cols-2 gap-2">
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Manage Learner Queries"/>
                        <FormControlLabel control={<Checkbox />} label="View Reports"/>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Manage FAQs"/>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Access User List"/>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outlined" size="small">
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" size="small">
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4">
                    <div>
                        <Typography variant="h6">System Defaults</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Configure operational limits and response times
                        </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField size="small" type="time" label="Working Hours From" defaultValue="07:00"/>
                        <TextField size="small" type="time" label="To" defaultValue="17:00"/>
                    </div>

                    <div>
                        <Typography className="text-sm mb-1">
                            SLA for Query Responses (hours)
                        </Typography>
                        <Slider defaultValue={12} max={24} valueLabelDisplay="auto" />
                    </div>

                    <TextField size="small" fullWidth label="Default Query Type" value="General Inquiry"/>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outlined" size="small">
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" size="small">
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}