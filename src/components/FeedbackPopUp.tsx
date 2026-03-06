import { Snackbar, Alert, Slide } from "@mui/material";
import { forwardRef } from "react";
import type { TransitionProps } from "@mui/material/transitions";

interface FeedbackPopupProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const SlideUp = forwardRef(function SlideUp(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FeedbackPopup({
  open,
  message,
  severity,
  onClose,
}: FeedbackPopupProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      TransitionComponent={SlideUp}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          borderRadius: 2,
          minWidth: 320,
          boxShadow: 3,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}