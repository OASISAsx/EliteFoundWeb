"use client";
interface LoanContract {
  id: string;
  contractNumber: string;
  borrowerName: string;
  borrowerPhone: string;
  loanAmount: number;
  interestRate: number;
  duration: number; // เดือน
  purpose: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected" | "reviewing";
  monthlyPayment: number;
  totalRepayment: number;
  creditScore: number;
  employmentStatus: string;
  monthlyIncome: number;
}

const mockLoanContracts: LoanContract[] = [
  {
    id: "1",
    contractNumber: "LN-2024-001",
    borrowerName: "สมชาย ใจดี",
    borrowerPhone: "081-234-5678",
    loanAmount: 500000,
    interestRate: 5.5,
    duration: 24,
    purpose: "ซื้อรถยนต์",
    submittedDate: "2024-01-15",
    status: "pending",
    monthlyPayment: 22500,
    totalRepayment: 540000,
    creditScore: 720,
    employmentStatus: "พนักงานประจำ",
    monthlyIncome: 45000,
  },
  {
    id: "2",
    contractNumber: "LN-2024-002",
    borrowerName: "สมหญิง รักดี",
    borrowerPhone: "082-345-6789",
    loanAmount: 300000,
    interestRate: 6.0,
    duration: 36,
    purpose: "ปรับปรุงบ้าน",
    submittedDate: "2024-01-16",
    status: "reviewing",
    monthlyPayment: 9200,
    totalRepayment: 331200,
    creditScore: 680,
    employmentStatus: "ธุรกิจส่วนตัว",
    monthlyIncome: 35000,
  },
  {
    id: "3",
    contractNumber: "LN-2024-003",
    borrowerName: "วิชัย มั่งคั่ง",
    borrowerPhone: "083-456-7890",
    loanAmount: 1000000,
    interestRate: 4.5,
    duration: 60,
    purpose: "ซื้อบ้าน",
    submittedDate: "2024-01-14",
    status: "approved",
    monthlyPayment: 18650,
    totalRepayment: 1119000,
    creditScore: 780,
    employmentStatus: "พนักงานรัฐวิสาหกิจ",
    monthlyIncome: 75000,
  },
  {
    id: "4",
    contractNumber: "LN-2024-004",
    borrowerName: "ประภา สดใส",
    borrowerPhone: "084-567-8901",
    loanAmount: 150000,
    interestRate: 7.0,
    duration: 12,
    purpose: "ชำระหนี้",
    submittedDate: "2024-01-17",
    status: "rejected",
    monthlyPayment: 13150,
    totalRepayment: 157800,
    creditScore: 580,
    employmentStatus: "พนักงานชั่วคราว",
    monthlyIncome: 18000,
  },
  {
    id: "5",
    contractNumber: "LN-2024-005",
    borrowerName: "อนุชา ก้าวหน้า",
    borrowerPhone: "085-678-9012",
    loanAmount: 750000,
    interestRate: 5.0,
    duration: 48,
    purpose: "ลงทุนธุรกิจ",
    submittedDate: "2024-01-18",
    status: "pending",
    monthlyPayment: 17250,
    totalRepayment: 828000,
    creditScore: 750,
    employmentStatus: "เจ้าของกิจการ",
    monthlyIncome: 90000,
  },
];

import React, { useState } from "react";

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Visibility,
  Edit,
  TrendingUp,
  Person,
  AttachMoney,
} from "@mui/icons-material";
// import { LoanContract, mockLoanContracts } from "@/lib/mockData";

export default function LoanApprovalTable() {
  const [loans, setLoans] = useState<LoanContract[]>(mockLoanContracts);
  const [selectedLoan, setSelectedLoan] = useState<LoanContract | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | "view">(
    "view",
  );
  const [remarks, setRemarks] = useState("");

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "reviewing":
        return "warning";
      default:
        return "info";
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "อนุมัติแล้ว";
      case "rejected":
        return "ปฏิเสธ";
      case "reviewing":
        return "กำลังพิจารณา";
      default:
        return "รอดำเนินการ";
    }
  };

  // Handle action
  const handleAction = (
    loan: LoanContract,
    type: "approve" | "reject" | "view",
  ) => {
    setSelectedLoan(loan);
    setActionType(type);
    setOpenDialog(true);
    setRemarks("");
  };

  // Submit action
  const handleSubmit = () => {
    if (!selectedLoan) return;

    const updatedLoans = loans.map((loan) =>
      loan.id === selectedLoan.id
        ? {
            ...loan,
            status: actionType === "approve" ? "approved" : "rejected",
          }
        : loan,
    );

    // setLoans(updatedLoans);
    setOpenDialog(false);
    setSelectedLoan(null);
  };

  // Define columns
  const columns: GridColDef[] = [
    {
      field: "contractNumber",
      headerName: "เลขที่สัญญา",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" className="font-semibold text-blue-600">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "borrowerName",
      headerName: "ชื่อผู้กู้",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex items-center gap-2">
          <Person className="text-gray-500" fontSize="small" />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "borrowerPhone",
      headerName: "เบอร์โทร",
      width: 130,
    },
    {
      field: "loanAmount",
      headerName: "วงเงินกู้",
      width: 140,
      type: "number",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" className="font-semibold text-green-600">
          {formatCurrency(params.value as number)}
        </Typography>
      ),
    },
    {
      field: "interestRate",
      headerName: "อัดราดอกเบี้ย",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={`${params.value}%`}
          size="small"
          className="bg-purple-100 text-purple-700"
        />
      ),
    },
    {
      field: "duration",
      headerName: "ระยะเวลา (เดือน)",
      width: 140,
      type: "number",
    },
    {
      field: "monthlyPayment",
      headerName: "ผ่อนต่อเดือน",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <span className="text-orange-600 font-medium">
          {formatCurrency(params.value as number)}
        </span>
      ),
    },
    {
      field: "creditScore",
      headerName: "คะแนนเครดิต",
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const score = params.value as number;
        const color =
          score >= 700
            ? "text-green-600"
            : score >= 600
              ? "text-yellow-600"
              : "text-red-600";
        return (
          <div className="flex items-center gap-1">
            <TrendingUp className={color} fontSize="small" />
            <span className={`font-semibold ${color}`}>{score}</span>
          </div>
        );
      },
    },
    {
      field: "purpose",
      headerName: "วัตถุประสงค์",
      width: 150,
    },
    {
      field: "submittedDate",
      headerName: "วันที่ยื่น",
      width: 120,
    },
    {
      field: "status",
      headerName: "สถานะ",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={getStatusLabel(params.value as string)}
          color={getStatusColor(params.value as string)}
          size="small"
          className="font-medium"
        />
      ),
    },
    {
      field: "actions",
      headerName: "จัดการ",
      width: 180,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const loan = params.row as LoanContract;
        const isPending = loan.status === "pending";

        return (
          <Stack direction="row" spacing={1}>
            <Tooltip title="ดูรายละเอียด">
              <IconButton
                size="small"
                onClick={() => handleAction(loan, "view")}
                className="text-blue-600"
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>

            {isPending && (
              <>
                <Tooltip title="อนุมัติ">
                  <IconButton
                    size="small"
                    onClick={() => handleAction(loan, "approve")}
                    className="text-green-600"
                  >
                    <CheckCircle fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="ปฏิเสธ">
                  <IconButton
                    size="small"
                    onClick={() => handleAction(loan, "reject")}
                    className="text-red-600"
                  >
                    <Cancel fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Stack>
        );
      },
    },
  ];

  return (
    <div className="w-full p-20">
      <Paper elevation={3} className="rounded-lg overflow-hidden">
        {/* Header */}
        <Box className="bg-linear-to-r from-violet-950 to-cyan-200  p-6 text-white">
          <Typography variant="h4" className="font-bold mb-2">
            ระบบอนุมัติการกู้เงิน
          </Typography>
          <Typography variant="body1" className="opacity-90">
            จัดการและพิจารณาคำขอกู้เงินของลูกค้า
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Box className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50">
          <Paper className="p-4 border-l-4 border-blue-500">
            <Typography variant="caption" className="text-gray-600">
              รอดำเนินการ
            </Typography>
            <Typography variant="h5" className="font-bold text-blue-600">
              {loans.filter((l) => l.status === "pending").length}
            </Typography>
          </Paper>
          <Paper className="p-4 border-l-4 border-green-500">
            <Typography variant="caption" className="text-gray-600">
              อนุมัติแล้ว
            </Typography>
            <Typography variant="h5" className="font-bold text-green-600">
              {loans.filter((l) => l.status === "approved").length}
            </Typography>
          </Paper>
          <Paper className="p-4 border-l-4 border-red-500">
            <Typography variant="caption" className="text-gray-600">
              ปฏิเสธ
            </Typography>
            <Typography variant="h5" className="font-bold text-red-600">
              {loans.filter((l) => l.status === "rejected").length}
            </Typography>
          </Paper>
          <Paper className="p-4 border-l-4 border-orange-500">
            <Typography variant="caption" className="text-gray-600">
              วงเงินรวม
            </Typography>
            <Typography variant="h6" className="font-bold text-orange-600">
              {formatCurrency(loans.reduce((sum, l) => sum + l.loanAmount, 0))}
            </Typography>
          </Paper>
        </Box>

        {/* DataGrid */}
        <Box className="p-6">
          <DataGrid
            rows={loans}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            className="bg-white"
            sx={{
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          />
        </Box>
      </Paper>

      {/* Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="bg-gray-100">
          {actionType === "view" && "รายละเอียดคำขอกู้เงิน"}
          {actionType === "approve" && "อนุมัติคำขอกู้เงิน"}
          {actionType === "reject" && "ปฏิเสธคำขอกู้เงิน"}
        </DialogTitle>

        <DialogContent dividers>
          {selectedLoan && (
            <Box className="space-y-4 py-4">
              {/* Contract Info */}
              <Paper className="p-4 bg-blue-50">
                <Typography variant="h6" className="mb-3 text-blue-800">
                  ข้อมูลสัญญา
                </Typography>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      เลขที่สัญญา
                    </Typography>
                    <Typography className="font-semibold">
                      {selectedLoan.contractNumber}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      วันที่ยื่นคำขอ
                    </Typography>
                    <Typography className="font-semibold">
                      {selectedLoan.submittedDate}
                    </Typography>
                  </div>
                </div>
              </Paper>

              {/* Borrower Info */}
              <Paper className="p-4 bg-green-50">
                <Typography variant="h6" className="mb-3 text-green-800">
                  ข้อมูลผู้กู้
                </Typography>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      ชื่อ-นามสกุล
                    </Typography>
                    <Typography className="font-semibold">
                      {selectedLoan.borrowerName}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      เบอร์โทรศัพท์
                    </Typography>
                    <Typography className="font-semibold">
                      {selectedLoan.borrowerPhone}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      สถานะการทำงาน
                    </Typography>
                    <Typography className="font-semibold">
                      {selectedLoan.employmentStatus}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      รายได้ต่อเดือน
                    </Typography>
                    <Typography className="font-semibold text-green-600">
                      {formatCurrency(selectedLoan.monthlyIncome)}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      คะแนนเครดิต
                    </Typography>
                    <Typography className="font-semibold">
                      {selectedLoan.creditScore}
                    </Typography>
                  </div>
                </div>
              </Paper>

              {/* Loan Details */}
              <Paper className="p-4 bg-purple-50">
                <Typography variant="h6" className="mb-3 text-purple-800">
                  รายละเอียดเงินกู้
                </Typography>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      วงเงินกู้
                    </Typography>
                    <Typography className="font-semibold text-lg text-purple-600">
                      {formatCurrency(selectedLoan.loanAmount)}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      อัตราดอกเบี้ย
                    </Typography>
                    <Typography className="font-semibold">
                      {selectedLoan.interestRate}% ต่อปี
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      ระยะเวลา
                    </Typography>
                    <Typography className="font-semibold">
                      {selectedLoan.duration} เดือน
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      ผ่อนชำระต่อเดือน
                    </Typography>
                    <Typography className="font-semibold text-orange-600">
                      {formatCurrency(selectedLoan.monthlyPayment)}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      ยอดชำระทั้งหมด
                    </Typography>
                    <Typography className="font-semibold">
                      {formatCurrency(selectedLoan.totalRepayment)}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      วัตถุประสงค์
                    </Typography>
                    <Typography className="font-semibold">
                      {selectedLoan.purpose}
                    </Typography>
                  </div>
                </div>
              </Paper>

              {/* Remarks for approve/reject */}
              {actionType !== "view" && (
                <TextField
                  label="หมายเหตุ"
                  multiline
                  rows={4}
                  fullWidth
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="กรอกหมายเหตุเพิ่มเติม..."
                />
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions className="p-4">
          <Button
            onClick={() => setOpenDialog(false)}
            className="text-gray-600"
          >
            ปิด
          </Button>
          {actionType === "approve" && (
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              onClick={handleSubmit}
            >
              อนุมัติ
            </Button>
          )}
          {actionType === "reject" && (
            <Button
              variant="contained"
              color="error"
              startIcon={<Cancel />}
              onClick={handleSubmit}
            >
              ปฏิเสธ
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
