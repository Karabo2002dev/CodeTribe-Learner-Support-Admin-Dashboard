import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { respondToQuery } from "../services/queryServices";
import FeedbackPopup from "../components/FeedbackPopUp";

interface Props {
  open: boolean;
  onClose: () => void;
  query: {
    id: string;
    phone: string;
    question: string;
    status: string;
  };
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
    } catch (err: any) {
      setPopup({
        open: true,
        message:
          err?.response?.data?.message ||
          "Failed to send response",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Respond to Query
          <Chip
            label={query.status}
            size="small"
            sx={{ ml: 2 }}
          />
        </DialogTitle>

        <DialogContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{query.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Question</p>
            <p className="text-gray-800">{query.question}</p>
          </div>

          <TextField
            label="Your Response"
            multiline
            rows={4}
            fullWidth
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !responseText}
          >
            {loading ? "Sending..." : "Send Response"}
          </Button>
        </DialogActions>
      </Dialog>

      <FeedbackPopup
        open={popup.open}
        message={popup.message}
        severity={popup.severity}
        onClose={() => setPopup({ ...popup, open: false })}
      />
    </>
  );
}