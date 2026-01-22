// components/loan/loanColumns.ts
import { GridColDef } from "@mui/x-data-grid";

export const loanColumns: GridColDef[] = [
  {
    field: "loanAmount",
    headerName: "วงเงินกู้",
    headerAlign: "center",
    width: 140,
    valueFormatter: (v) =>
      Number(v).toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      }),
  },
  {
    field: "interestRate",
    headerName: "ดอกเบี้ย (%)",
    width: 120,
    headerAlign: "center",
  },
  {
    field: "termMonths",
    headerName: "งวด (เดือน)",
    width: 100,
    headerAlign: "center",
  },
  {
    field: "installmentPerMonth",
    headerName: "ผ่อน/เดือน",
    width: 140,
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

    headerAlign: "center",
    renderCell: (params) => {
      const color =
        params.value === "approve"
          ? "green"
          : params.value === "pending"
            ? "orange"
            : "red";

      return <span style={{ color, fontWeight: 600 }}>{params.value}</span>;
    },
  },
  {
    field: "startDate",
    headerName: "วันที่เริ่ม",
    width: 120,
    headerAlign: "center",
    valueFormatter: (v) => new Date(v).toLocaleDateString("th-TH"),
  },
];
