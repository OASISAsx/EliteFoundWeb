"use client";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

type Severity = "success" | "error" | "info" | "warning";

type ToastAlertProps = {
  open: boolean;
  message: string;
  severity?: Severity;
  onClose: () => void;
};

function SlideTransition(props: any) {
  return <Slide {...props} direction="left" />;
}

const colorMap: Record<Severity, any> = {
  success: {
    bg: "#16a34a",
    color: "#fff",
  },
  error: {
    bg: "#dc2626",
    color: "#fff",
  },
  info: {
    bg: "#2563eb",
    color: "#fff",
  },
  warning: {
    bg: "#f59e0b",
    color: "#000",
  },
};

export default function ToastAlert({
  open,
  message,
  severity = "success",
  onClose,
}: ToastAlertProps) {
  const colors = colorMap[severity];

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      sx={{ mt: 2 }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          backgroundColor: colors.bg,
          color: colors.color,
          fontWeight: 500,
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,.2)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
