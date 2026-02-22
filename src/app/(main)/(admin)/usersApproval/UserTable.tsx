"use client";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper } from "@mui/material";
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

export default function UserTable({
  rows,
  columns,
  page,
  pageSize,
  rowCount,
  onPaginationChange,
  onRowClick,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #f0f0f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        rowCount={rowCount}
        onPaginationModelChange={onPaginationChange}
        pageSizeOptions={[5, 10, 25]}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        onRowClick={(params) => onRowClick?.(params.row)}
        sx={{
          border: "none",
          fontSize: 14,

          // header
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#fafafa",
            fontWeight: 600,
            borderBottom: "1px solid #eee",
          },

          // row hover
          "& .MuiDataGrid-row": {
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f5f9ff",
            },
          },

          // remove default borders
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f5f5f5",
          },

          // remove focus outline
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },

          // pagination area spacing
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #f0f0f0",
            backgroundColor: "#fff",
          },
        }}
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
    </Paper>
  );
}
