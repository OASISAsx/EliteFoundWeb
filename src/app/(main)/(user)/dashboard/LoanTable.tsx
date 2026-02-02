// components/loan/LoanTable.tsx
import { Box, Card, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { loanColumns } from "./loanColumns";
import { LoanContract } from "@/src/types/loanContact";

interface LoanTableProps {
  loans: LoanContract[];
}

export default function LoanTable({ loans }: LoanTableProps) {
  //   if (!loans || loans.length === 0) {
  //     return (
  //       <Typography sx={{ textAlign: "center", opacity: 0.6, mt: 2 }}>
  //         ไม่พบข้อมูลเงินกู้
  //       </Typography>
  //     );
  //   }

  return (
    <Grid size={{ xs: 12, lg: 5 }}>
      <Card
        sx={{
          // bgcolor: "transparent",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          boxShadow: "none",
        }}
      >
        <Box sx={{ height: 390, width: "100%" }}>
          <DataGrid
            rows={loans}
            columns={loanColumns}
            getRowId={(row) => row.id}
            hideFooter
            disableRowSelectionOnClick
            sx={{
              border: "none",
              fontSize: "13px",
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                textAlign: "center",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                textAlign: "center",
              },
            }}
          />
        </Box>
      </Card>
    </Grid>
  );
}
