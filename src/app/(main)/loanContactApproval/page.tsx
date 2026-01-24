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
  status: "PENDING" | "APPROVED" | "ACTIVE" | "COMPLETED" | "REJECT";
  monthlyPayment: number;
  totalRepayment: number;
  creditScore: number;
  employmentStatus: string;
  monthlyIncome: number;
}

import React, { useEffect, useRef, useState } from "react";

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import { CheckCircle, Cancel, Visibility } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/src/stores/user.store";
import { useLoanContactStore } from "@/src/stores/loanContact.store ";
import LoanStatusCards from "@/src/components/cardLoanStatus";
import LoanTable from "./LoanTable";
import LoanDetailDialog from "./LoanDetailDialog";
import { renderStatusChip } from "@/src/components/renderStatusChip";
// import { LoanContract, mockLoanContracts } from "@/lib/mockData";

export default function LoanApprovalTable() {
  // const [loans, setLoans] = useState<LoanContract[]>(mockLoanContracts);

  const [selectedLoan, setSelectedLoan] = useState<LoanContract | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<
    "PENDING" | "APPROVED" | "ACTIVE" | "COMPLETED" | "REJECT"
  >("PENDING");
  const [remarks, setRemarks] = useState("");
  const { data: session, status } = useSession();
  const {
    fetchAllLoan,
    dataLoan,
    mainStatus,
    page,
    pageSize,
    rowCount,
    setPagination,
  } = useLoanContactStore();

  // const called = useRef(false);

  useEffect(() => {
    if (!session?.user) return;

    const role = session.user.userRoles.find(
      (r: any) => r.role.name === "ADMIN",
    );

    if (!role) return;
    console.log(page, pageSize, "useEff");
    fetchAllLoan(
      page,
      pageSize,
      role.role.apiSecret,
      session.user.backendToken,
    );
  }, [page, pageSize, session?.user?.id]);

  const data = {
    status: {
      PENDING: 1,
      APPROVED: 0,
      ACTIVE: 0,
      COMPLETED: 0,
      REJECTED: 0,
    },
  };

  // Handle action
  const handleAction = (
    loan: LoanContract,
    type: "PENDING" | "APPROVED" | "ACTIVE" | "COMPLETED" | "REJECT",
  ) => {
    setSelectedLoan(loan);
    setActionType(type);
    setOpenDialog(true);
    setRemarks("");
  };

  // Submit action
  const handleSubmit = () => {
    if (!selectedLoan) return;

    const updatedLoans = dataLoan.map((loan) =>
      loan.id === selectedLoan.id
        ? {
            ...loan,
            status: actionType === "APPROVED" ? "APPROVED" : "REJECTED",
          }
        : loan,
    );

    // setDataLoan(updatedLoans); // ✅ ต้อง set กลับ
    setOpenDialog(false);
    setSelectedLoan(null);
  };

  const loanColumns: GridColDef[] = [
    {
      field: "loanNo",
      headerName: "เลขที่สัญญา",
      flex: 0.9,
      minWidth: 140,
    },
    {
      field: "borrower",
      headerName: "รายชื่อ",
      flex: 1.2,
      minWidth: 180,
      valueGetter: (_, row) =>
        `${row.usersInformation?.firstName ?? ""} ${
          row.usersInformation?.lastName ?? ""
        }`,
    },
    {
      field: "loanAmount",
      headerName: "วงเงินกู้",
      flex: 1,
      minWidth: 150,
      align: "right",
      headerAlign: "right",
      valueFormatter: (value) =>
        Number(value).toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        }),
    },
    {
      field: "loanType",
      headerName: "วัตถุประสงค์",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "สถานะ",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => renderStatusChip(params.value),
    },
    {
      field: "createdAt",
      headerName: "วันที่สร้าง",
      flex: 1,
      minWidth: 140,
      valueFormatter: (value) => new Date(value).toLocaleDateString("th-TH"),
    },
    {
      field: "actions",
      headerName: "จัดการ",
      width: 180,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const loan = params.row as LoanContract;
        const isPending = loan.status === "PENDING";

        return (
          <Stack direction="row" spacing={1}>
            <Tooltip title="ดูรายละเอียด">
              <IconButton
                size="small"
                onClick={() => handleAction(loan, "PENDING")}
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
                    onClick={() => handleAction(loan, "APPROVED")}
                    className="text-green-600"
                  >
                    <CheckCircle fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="ปฏิเสธ">
                  <IconButton
                    size="small"
                    onClick={() => handleAction(loan, "REJECT")}
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
    <div className="w-full p-18">
      <Paper elevation={3} className="rounded-3xl overflow-hidden">
        {/* Header */}
        <Box className="bg-linear-to-r from-violet-950 to-cyan-200  p-6 text-white">
          <Typography variant="h4" className="font-bold mb-2">
            ระบบอนุมัติการกู้เงิน
          </Typography>
          <Typography variant="body1" className="opacity-90">
            จัดการและพิจารณาคำขอกู้เงินของลูกค้า
          </Typography>
        </Box>

        <Box className="p-6">
          <LoanStatusCards status={mainStatus || data.status} />
        </Box>

        {/* DataGrid */}
        <LoanTable
          rows={dataLoan}
          columns={loanColumns}
          page={page}
          pageSize={pageSize}
          rowCount={rowCount}
          onPaginationChange={({ page, pageSize }) => {
            setPagination(page, pageSize);
          }}
          onRowClick={(row) => {
            setSelectedLoan(row);
            setOpenDialog(true);
          }}
        />
      </Paper>

      {/* Detail Dialog */}
      <LoanDetailDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        loan={selectedLoan}
        actionType={actionType}
        remarks={remarks}
        setRemarks={setRemarks}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
