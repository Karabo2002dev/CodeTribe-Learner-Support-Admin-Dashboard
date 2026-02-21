import { Typography, TextField, Button, Paper } from "@mui/material";

export default function QueryDetails() {
    return (
        <div className="min-h-screen bg-[#f5f5f5] p-10">
            <Paper
                elevation={0}
                className="rounded-3xl bg-white p-12 shadow-sm"
            >
                <Typography variant="h5" className="font-semibold text-black">
                    Query Details
                </Typography>

                <Typography className="text-gray-500 mt-2">
                    Select a staff member an an internal note for this query
                </Typography>

                <div className="mt-8 space-y-3">
                    <Typography className="font-semibold text-gray-800">
                        Query Info
                    </Typography>

                    <Typography>
                        <span className="font-semibold">Phone Number:</span>{" "}
                        <span className="text-gray-600">0815252702</span>
                    </Typography>

                    <Typography>
                        <span className="font-semibold">Query ID:</span>{" "}
                        <span className="text-gray-600">query123</span>
                    </Typography>

                    <Typography>
                        <span className="font-semibold">Status:</span>{" "}
                        <span className="text-orange-600 font-medium">
                            Escalated
                        </span>
                    </Typography>

                    <Typography>
                        <span className="font-semibold">Date :</span>{" "}
                        <span className="text-gray-800">12 Jan 2026</span>
                    </Typography>

                    <Typography>
                        <span className="font-semibold">Question:</span>{" "}
                        <span className="text-gray-600">
                            Can I speak to an agent.
                        </span>
                    </Typography>
                </div>

                <div className="mt-10">
                    <Typography variant="h6" className="font-semibold mb-4">
                        Respond To Query
                    </Typography>

                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        placeholder="Type your response to the learner...."
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "14px",
                                "& fieldset": {
                                borderColor: "#16a34a"
                                },
                                "&:hover fieldset": {
                                borderColor: "#15803d"
                                },
                                "&.Mui-focused fieldset": {
                                borderColor: "#15803d"
                                }
                            }
                        }}
                    />
                </div>

                <div className="border-t border-gray-300 mt-8 pt-8 flex justify-end gap-6">
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            backgroundColor: "#b7e4c7",
                            color: "#065f46",
                            borderRadius: "18px",
                            textTransform: "none",
                            px: 4,
                            py: 1.2,
                            "&:hover": {
                                backgroundColor: "#95d5b2"
                            }
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            backgroundColor: "#95d5b2",
                            color: "#064e3b",
                            borderRadius: "18px",
                            textTransform: "none",
                            px: 4,
                            py: 1.2,
                            "&:hover": {
                                backgroundColor: "#74c69d",
                            }
                        }}
                    >
                        Save Draft
                    </Button>

                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                        backgroundColor: "#0f9d58",
                        borderRadius: "18px",
                        textTransform: "none",
                        px: 5,
                        py: 1.2,
                        fontWeight: 500,
                        "&:hover": {
                            backgroundColor: "#0c7c45"
                        }
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
    )
}