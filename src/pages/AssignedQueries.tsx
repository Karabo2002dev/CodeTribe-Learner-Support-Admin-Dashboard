import { Typography, Button, Chip, Paper } from "@mui/material";

const rows = [
    {
        name: "Karabo Kgaphola",
        question: "Schedules",
        status: "Open",
        date: "01 January 2026"
    },
    {
        name: "Zwivhuya Sagida",
        question: "Assessments",
        status: "Resolved",
        date: "01 January 2026"
    },
    {
        name: "Mpho Khaphathe",
        question: "Assessments",
        status: "Open",
        date: "28 November 2025"
    },
    {
        name: "Motikoni Mohofe",
        question: "Support Service",
        status: "Resolved",
        date: "01 December 2025"
    },
    {
        name: "Siyanda Mhlongo",
        question: "Support Service",
        status: "Open",
        date: "05 December 2025"
    }
]

export default function AssignedQueries() {
    return (
        <div className="min-h-screen bg-white px-16 py-10">
            <div className="mb-12">
                <Typography variant="h5" className="font-semibold text-black">
                    Assigned Queries
                </Typography>
                <Typography variant="body2" className="text-gray-500 mt-2">
                    Queries awaiting your response
                </Typography>
            </div>

            <Paper elevation={0} className="rounded-2xl border border-gray-200 shadow-lg p-6 bg-white">
                <div className="overflow-hidden rounded-xl border border-gray-200">

                    <div className="grid grid-cols-5 bg-[#cfe6dc] text-gray-700 font-semibold text-sm px-8 py-4">
                        <div>Phone Number</div>
                        <div>Question</div>
                        <div>Status</div>
                        <div>Date</div>
                        <div className="text-right">Action</div>
                    </div>

                    {rows.map((row, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 items-center px-8 py-6 border-b border-[#1b9e77] last:border-b-0 bg-white transition-colors duration-200 hover:bg-[#f3faf7]"
                        >
                            <Typography className="text-gray-800 font-medium">
                                {row.name}
                            </Typography>

                            <Typography className="text-gray-600">
                                {row.question}
                            </Typography>

                            <div>
                                {row.status === "Open" ? (
                                    <Chip
                                        label="Open"
                                        size="small"
                                        sx={{
                                            backgroundColor: "#b7e4c7",
                                            color: "#1b5e20",
                                            fontWeight: 600,
                                            borderRadius: "999px",
                                            px: 1
                                        }}
                                    />
                                ) : (
                                    <Typography className="text-gray-600 font-medium">
                                        Resolved
                                    </Typography>
                                )}
                            </div>

                            <Typography className="text-gray-600">
                                {row.date}
                            </Typography>

                            <div className="flex justify-end">
                                <Button
                                    variant="contained"
                                    disableElevation
                                    sx={{
                                        backgroundColor: "#0f9d58",
                                        "&:hover": { backgroundColor: "#0c7c45" },
                                        borderRadius: "14px",
                                        textTransform: "none",
                                        px: 3,
                                        py: 1,
                                        fontWeight: 500
                                    }}
                                >
                                    View
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Paper>

            <div className="mt-16 border-t border-[#1b9e77] pt-6 text-center text-sm text-gray-500">
                © 2026 CodeTribe Learner Support. All rights reserved
            </div>
        </div>
    )
}