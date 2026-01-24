// components/loan/loanColumns.ts
import { renderStatusChip } from "@/src/components/renderStatusChip";
import { GridColDef } from "@mui/x-data-grid";

export const loanColumns: GridColDef[] = [
  {
    field: "loanAmount",
    headerName: "วงเงินกู้",
    headerAlign: "center",
    flex: 0.9,
    minWidth: 140,
    valueFormatter: (v) =>
      Number(v).toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      }),
  },
  // {
  //   field: "interestRate",
  //   headerName: "ดอกเบี้ย (%)",
  //   flex: 0.9,
  //   minWidth: 140,
  //   headerAlign: "center",
  // },
  {
    field: "termMonths",
    headerName: "งวด (เดือน)",
    flex: 0.9,
    minWidth: 140,
    headerAlign: "center",
  },
  {
    field: "installmentPerMonth",
    headerName: "ผ่อน/เดือน",
    flex: 0.9,
    minWidth: 140,
    headerAlign: "center",
    valueFormatter: (v) =>
      Number(v).toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      }),
  },
  // {
  //   field: "loanType",
  //   headerName: "ประเภทเงินกู้",
  //   width: 120,
  //   headerAlign: "center",
  // },
  {
    field: "status",
    headerName: "สถานะ",
    flex: 0.9,
    minWidth: 140,
    headerAlign: "center",
    renderCell: (params) => renderStatusChip(params.value),
    // renderCell: (params) => {
    //   const color =
    //     params.value === "approve"
    //       ? "green"
    //       : params.value === "PENDING"
    //         ? "orange"
    //         : "red";

    //   return <span style={{ color, fontWeight: 600 }}>{params.value}</span>;
    // },
  },
  {
    field: "startDate",
    headerName: "วันที่เริ่ม",
    flex: 0.9,
    minWidth: 140,
    headerAlign: "center",
    valueFormatter: (v) => new Date(v).toLocaleDateString("th-TH"),
  },
];
