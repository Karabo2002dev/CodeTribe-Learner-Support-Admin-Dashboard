import { useEffect, useState } from "react";
import axios from "../api/axios";
import QueryDetailsModal from "../form/QueryReply";
import FeedbackPopup from "../components/FeedbackPopUp";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

interface AssignedQuery {
  id: string;
  phone: string;
  question: string;
  status: string;
  created_at: string;
}

interface ApiErrorResponse {
  message?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data: AssignedQuery[];
}

const statusStyles = (status: string) => {
  switch (status) {
    case "RESOLVED":
      return "bg-green-100 text-green-700";
    case "ESCALATED":
      return "bg-yellow-100 text-yellow-700";
    case "NEED_FOLLOW_UP":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export default function AssignedQueries() {
  const [queries, setQueries] = useState<AssignedQuery[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<AssignedQuery | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  function showPopup(
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) {
    setPopupMessage(message);
    setPopupSeverity(severity);
    setPopupOpen(true);
  }

  useEffect(() => {
    const fetchAssignedQueries = async () => {
      try {
        setLoading(true);

        const res = await axios.get<ApiResponse>(
          "/queries/assigned/facilitator"
        );

        if (!res.data.success) {
          throw new Error(res.data.message || "Failed to fetch queries");
        }

        setQueries(res.data.data);

        showPopup("Assigned queries loaded successfully", "success");
      } catch (error: unknown) {
        let message = "Failed to load assigned queries";

        if (typeof error === "object" && error !== null) {
          const err = error as { response?: { data?: ApiErrorResponse } };

          if (err.response?.data?.message) {
            message = err.response.data.message;
          }
        }

        showPopup(message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedQueries();
  }, []);

  const handleViewQuery = (query: AssignedQuery) => {
    setSelectedQuery(query);
    setOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
        <h3 className="font-semibold text-gray-900 mb-4">
          Assigned Queries
        </h3>

        <div className="border border-green-200 rounded-xl max-h-[420px] overflow-y-auto">
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow className="bg-green-100">
                  <TableCell>ID</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Loading queries...
                    </TableCell>
                  </TableRow>
                )}

                {!loading && queries.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No assigned queries
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  queries.map((q) => (
                    <TableRow key={q.id} hover>
                      <TableCell>{q.id}</TableCell>

                      <TableCell>{q.phone}</TableCell>

                      <TableCell className="max-w-[320px] truncate">
                        {q.question}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles(
                            q.status
                          )}`}
                        >
                          {q.status}
                        </span>
                      </TableCell>

                      <TableCell>
                        {new Date(q.created_at).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>

                      <TableCell>
                        <Button
                          size="small"
                          onClick={() => handleViewQuery(q)}
                          variant="outlined"
                          sx={{
                            borderRadius: "12px",
                            textTransform: "none",
                            borderColor: "#16a34a",
                            color: "#16a34a",
                            "&:hover": {
                              backgroundColor: "#dcfce7",
                              borderColor: "#15803d",
                            },
                          }}
                        >
                          View Query
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {selectedQuery && (
        <QueryDetailsModal
          open={open}
          onClose={() => setOpen(false)}
          query={selectedQuery}
        />
      )}

      <FeedbackPopup
        open={popupOpen}
        message={popupMessage}
        severity={popupSeverity}
        onClose={() => setPopupOpen(false)}
      />
    </>
  );
}