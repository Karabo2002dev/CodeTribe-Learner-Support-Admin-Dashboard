import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
  Box,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { respondToQuery } from "../services/queryServices";
import FeedbackPopup from "../components/FeedbackPopUp";

interface QueryData {
  id: string;
  phone: string;
  question: string;
  status: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  query: QueryData;
}

interface ApiErrorShape {
  response?: {
    data?: {
      message?: string;
    };
  };
}

function getStatusStyles(status: string) {
  switch (status) {
    case "OPEN":
      return {
        backgroundColor: "#dcfce7",
        color: "#166534",
      };
    case "ESCALATED":
      return {
        backgroundColor: "#fef3c7",
        color: "#92400e",
      };
    case "CLOSED":
    case "RESOLVED":
      return {
        backgroundColor: "#e5e7eb",
        color: "#374151",
      };
    case "NEEDS_FOLLOWUP":
      return {
        backgroundColor: "#fee2e2",
        color: "#991b1b",
      };
    default:
      return {
        backgroundColor: "#f3f4f6",
        color: "#4b5563",
      };
  }
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const apiError = error as ApiErrorShape;
    return apiError.response?.data?.message || "Failed to send response";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to send response";
}

export default function QueryReply({ open, onClose, query }: Props) {
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await respondToQuery(query.id, responseText);

      if (res.success) {
        setPopup({
          open: true,
          message: res.message,
          severity: "success",
        });

        setResponseText("");
        onClose();
      }
    } catch (error: unknown) {
      setPopup({
        open: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={loading ? undefined : onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            px: 3,
            py: 2.5,
            borderBottom: "1px solid #f3f4f6",
            backgroundColor: "#ffffff",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827" }}
              >
                Respond to Query
              </Typography>
              <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
                Review the learner’s message and send your response.
              </Typography>
            </Box>

            <Chip
              label={query.status}
              size="small"
              sx={{
                fontWeight: 700,
                borderRadius: "999px",
                ...getStatusStyles(query.status),
              }}
            />
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 3, backgroundColor: "#ffffff" }}>
          <Stack spacing={2.5}>
            <Box
              sx={{
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                backgroundColor: "#f9fafb",
                p: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Learner Phone
              </Typography>
              <Typography sx={{ color: "#111827", fontWeight: 600 }}>
                {query.phone}
              </Typography>
            </Box>

            <Box
              sx={{
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                backgroundColor: "#f9fafb",
                p: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.75,
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Learner Question
              </Typography>
              <Typography
                sx={{
                  color: "#1f2937",
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {query.question}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "#f3f4f6" }} />

            <TextField
              label="Your Response"
              multiline
              rows={5}
              fullWidth
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Type your response here..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  backgroundColor: "#ffffff",
                  alignItems: "flex-start",
                  "& fieldset": {
                    borderColor: "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9ca3af",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#111827",
                  },
                },
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2.5,
            borderTop: "1px solid #f3f4f6",
            backgroundColor: "#ffffff",
          }}
        >
          <Button
            onClick={onClose}
            disabled={loading}
            variant="outlined"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              borderColor: "#d1d5db",
              color: "#374151",
              backgroundColor: "#ffffff",
              "&:hover": {
                borderColor: "#d1d5db",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !responseText.trim()}
            sx={{
              borderRadius: "12px",
              px: 2.5,
              textTransform: "none",
              boxShadow: "none",
              backgroundColor: "#111827",
              "&:hover": {
                backgroundColor: "#1f2937",
                boxShadow: "none",
              },
            }}
          >
            {loading ? "Sending..." : "Send Response"}
          </Button>
        </DialogActions>
      </Dialog>

      <FeedbackPopup
        open={popup.open}
        message={popup.message}
        severity={popup.severity}
        onClose={() => setPopup((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}