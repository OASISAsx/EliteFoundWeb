import { Chip } from "@mui/material";

const STATUS_MAP: Record<
  string,
  { label: string; color: "default" | "success" | "warning" | "error" | "info" }
> = {
  PENDING: { label: "รอดำเนินการ", color: "warning" },
  APPROVED: { label: "อนุมัติแล้ว", color: "info" },
  ACTIVE: { label: "กำลังผ่อน", color: "success" },
  COMPLETED: { label: "ปิดสัญญา", color: "success" },
  REJECTED: { label: "ปฏิเสธ", color: "error" },
};

export const renderStatusChip = (status: string) => {
  const config = STATUS_MAP[status] ?? {
    label: status,
    color: "default",
  };

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="filled"
      sx={{ fontWeight: 600 }}
    />
  );
};
