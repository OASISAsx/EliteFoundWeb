import { Box, Pagination, Select, MenuItem, Typography } from "@mui/material";

type FooterProps = {
  page: number;
  pageSize: number;
  rowCount: number;
  onChange: (model: { page: number; pageSize: number }) => void;
};

export function ModernTableFooter({
  page,
  pageSize,
  rowCount,
  onChange,
}: FooterProps) {
  const from = page * pageSize + 1;
  const to = Math.min(rowCount, (page + 1) * pageSize);
  const totalPages = Math.ceil(rowCount / pageSize);

  return (
    <Box
      sx={{
        px: 3, // เดิม 2 → 3
        py: 2.5, // เดิม 1.5 → 2.5
        minHeight: 72, // บังคับความสูง ดูแน่น
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3, // spacing ใหญ่ขึ้น
        borderTop: "1px solid",
        borderColor: "divider",
        flexWrap: "wrap",
        bgcolor: "background.paper",
      }}
    >
      {/* Rows per page */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Rows
        </Typography>
        <Select
          size="small"
          value={pageSize}
          sx={{ height: 32, fontSize: 14 }}
          onChange={(e) =>
            onChange({ page: 0, pageSize: Number(e.target.value) })
          }
        >
          {[5, 10, 25, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Info */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ whiteSpace: "nowrap" }}
      >
        {from}–{to} of {rowCount.toLocaleString()}
      </Typography>

      {/* Pagination */}
      <Pagination
        page={page + 1}
        count={totalPages}
        onChange={(_, value) => onChange({ page: value - 1, pageSize })}
        shape="rounded"
        size="small"
        color="primary"
        siblingCount={1}
        boundaryCount={1}
        sx={{
          "& .MuiPaginationItem-root": {
            minWidth: 32,
            height: 32,
            fontSize: 13,
            fontWeight: 500,
            borderRadius: "8px",
          },
          "& .Mui-selected": {
            fontWeight: 600,
          },
        }}
      />
    </Box>
  );
}
