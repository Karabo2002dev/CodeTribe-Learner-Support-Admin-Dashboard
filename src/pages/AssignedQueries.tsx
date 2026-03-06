import { useEffect, useState } from "react";
import axios from "../api/axios";
import QueryDetailsModal from "../form/QueryReply";

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
  const [selectedQuery, setSelectedQuery] =
    useState<AssignedQuery | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAssignedQueries = async () => {
      const res = await axios.get("/queries/assigned/facilitator");
      setQueries(res.data.result);
    };

    fetchAssignedQueries();
  }, []);

  const handleViewQuery = (query: AssignedQuery) => {
    console.log("Selected query:", query.id);
    console.log("Selected query details:", query);
    setSelectedQuery(query);
    setOpen(true);
  };

  return (
    <>
      {/* CONTAINER */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
        <h3 className="font-semibold text-gray-900 mb-4">
          Assigned Queries
        </h3>

        {/* SCROLLABLE TABLE */}
        <div className="border border-green-200 rounded-xl max-h-[420px] overflow-y-auto">
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow className="bg-green-100">
                  <TableCell className="font-medium text-gray-700">
                    ID
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">
                    Phone
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">
                    Question
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">
                    Status
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">
                    Date
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {queries.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-500 py-6"
                    >
                      No assigned queries
                    </TableCell>
                  </TableRow>
                )}

                {queries.map((q) => (
                  <TableRow
                    key={q.id}
                    hover
                    className="transition"
                  >
                    <TableCell className="text-gray-900">
                      {q.id}
                    </TableCell>

                    <TableCell className="text-gray-900">
                      {q.phone}
                    </TableCell>

                    <TableCell className="text-gray-600 max-w-[320px] truncate">
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

                    <TableCell className="text-gray-600">
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
                        variant="outlined"
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

      {/* MODAL */}
      {selectedQuery && (
        <QueryDetailsModal
          open={open}
          onClose={() => setOpen(false)}
          query={selectedQuery}
        />
      )}
    </>
  );
}