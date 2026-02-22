"use client";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { ModernTableFooter } from "@/src/components/CustomFooter";
type Props = {
  rows: any[];
  columns: any[];
  page: number;
  pageSize: number;
  rowCount: number;
  onPaginationChange: (model: { page: number; pageSize: number }) => void;
  onRowClick?: (row: any) => void;
};

export default function LoanTable({
  rows,
  columns,
  page,
  pageSize,
  rowCount,
  onPaginationChange,
  onRowClick,
}: Props) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      sx={{
        border: "none", // ขอบนอก
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: "none",
        },
      }}
      paginationMode="server"
      paginationModel={{ page, pageSize }}
      rowCount={rowCount}
      onPaginationModelChange={onPaginationChange}
      pageSizeOptions={[5, 10, 25]}
      getRowId={(row) => row.id}
      slots={{
        footer: () => (
          <ModernTableFooter
            page={page}
            pageSize={pageSize}
            rowCount={rowCount}
            onChange={onPaginationChange}
          />
        ),
      }}
    />
  );
}
