"use client";
// interface LoanContract {
//   id: string;
//   contractNumber: string;
//   borrowerName: string;
//   borrowerPhone: string;
//   loanAmount: number;
//   interestRate: number;
//   duration: number; // เดือน
//   purpose: string;
//   submittedDate: string;
//   status: "PENDING" | "APPROVED" | "ACTIVE" | "COMPLETED" | "REJECT";
//   monthlyPayment: number;
//   totalRepayment: number;
//   creditScore: number;
//   employmentStatus: string;
//   monthlyIncome: number;
// }

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
import { User } from "@/src/types/user.type";
// import { User } from "next-auth";
// import { LoanContract, mockLoanContracts } from "@/lib/mockData";

export default function LoanApprovalTable() {
  // const [loans, setLoans] = useState<LoanContract[]>(mockLoanContracts);

  const [selectedLoan, setSelectedLoan] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<
    "PENDING" | "APPROVED" | "ACTIVE"
  >("ACTIVE");
  const [remarks, setRemarks] = useState("");
  const { data: session, status } = useSession();
  const {
    loadingUsers,
    users,
    page,
    pageSize,
    fetchUsers,
    total,
    setPagination,
  } = useUserStore();

  // const called = useRef(false);

  useEffect(() => {
    if (!session?.user) return;

    const role = session.user.userRoles.find(
      (r: any) => r.role.name === "ADMIN",
    );

    if (!role) return;
    console.log(page, pageSize, "useEff");
    fetchUsers(role.role.apiSecret, session.user.backendToken);
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
    user: User,
    type: "PENDING" | "APPROVED" | "ACTIVE",
  ) => {
    setSelectedLoan(user);
    setActionType(type);
    setOpenDialog(true);
    setRemarks("");
  };

  // Submit action
  const handleSubmit = () => {
    if (!selectedLoan) return;

    const updatedLoans = users.map((loan) =>
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

  const borrowerColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "ชื่อผู้กู้",
      flex: 1.4,
      minWidth: 180,
      valueGetter: (_, row) =>
        `${row.usersInformation?.firstName ?? "-"} ${
          row.usersInformation?.lastName ?? ""
        }`,
    },

    {
      field: "citizenId",
      headerName: "เลขบัตรประชาชน",
      flex: 1.2,
      minWidth: 160,
      valueGetter: (_, row) => row.usersInformation?.citizenId ?? "-",
    },

    {
      field: "phone",
      headerName: "เบอร์โทร",
      flex: 1,
      minWidth: 140,
      valueGetter: (_, row) => row.usersInformation?.phone ?? "-",
    },

    {
      field: "occupation",
      headerName: "อาชีพ",
      flex: 1.2,
      minWidth: 160,
      valueGetter: (_, row) =>
        row.usersInformation?.JobDetail?.occupation ?? "-",
    },

    {
      field: "salary",
      headerName: "รายได้/เดือน",
      flex: 1.1,
      minWidth: 160,
      align: "right",
      headerAlign: "right",
      valueGetter: (_, row) => row.usersInformation?.JobDetail?.salaryPerMonth,
      // valueFormatter: ({ value }) =>
      //   value
      //     ? Number(value).toLocaleString("th-TH", {
      //         style: "currency",
      //         currency: "THB",
      //       })
      //     : "-",
    },

    {
      field: "status",
      headerName: "สถานะคำขอกู้",
      flex: 1,
      minWidth: 140,
      renderCell: (params) =>
        renderStatusChip(params.row.usersInformation?.status),
    },

    {
      field: "createdAt",
      headerName: "วันที่สมัคร",
      flex: 1.1,
      minWidth: 150,
      valueGetter: (_, row) => row.usersInformation?.createdAt,
      // valueFormatter: ({ value }) =>
      //   value ? new Date(value).toLocaleDateString("th-TH") : "-",
    },

    {
      field: "actions",
      headerName: "จัดการ",
      minWidth: 160,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        const user = params.row as any;
        const status = user.usersInformation?.status;

        const isPending = status === "PENDING";

        return (
          <Stack direction="row" spacing={1}>
            {/* ดูรายละเอียด */}
            <Tooltip title="ดูรายละเอียด">
              <IconButton
                size="small"
                onClick={() => handleAction(user, "PENDING")}
                sx={{ color: "primary.main" }}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>

            {isPending && (
              <>
                <Tooltip title="อนุมัติ">
                  <IconButton
                    size="small"
                    onClick={() => handleAction(user, "PENDING")}
                    sx={{ color: "success.main" }}
                  >
                    <CheckCircle fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="ปฏิเสธ">
                  <IconButton
                    size="small"
                    onClick={() => handleAction(user, "PENDING")}
                    sx={{ color: "error.main" }}
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
            ข้อมูลส่วนบุคคล
          </Typography>
          <Typography variant="body1" className="opacity-90">
            จัดการและตรวจสอบข้อมูลของลูกค้า
          </Typography>
        </Box>

        <Box className="p-6">
          {/* <LoanStatusCards status={mainStatus || data.status} /> */}
        </Box>

        {/* DataGrid */}
        <LoanTable
          rows={users}
          columns={borrowerColumns}
          page={page}
          pageSize={pageSize}
          rowCount={total}
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
