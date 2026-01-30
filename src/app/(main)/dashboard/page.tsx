"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Chip,
  Button,
  alpha,
  Grid,
  IconButton,
} from "@mui/material";

import {
  Users,
  CreditCard,
  Banknote,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  LogOutIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";
import { HourglassTop } from "@mui/icons-material";
import { useStatusMainStore } from "@/src/stores/mainStatus.store";
import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/src/stores/user.store";
import { StatsGrid } from "@/src/components/StatsGrid";
import { useLoanContactStore } from "@/src/stores/loanContact.store ";
import LoanTable from "./LoanTable";
import { width } from "@mui/system";

// ---------------- TYPES ----------------

interface LoanRow {
  id: number;
  name: string;
  phone: string;
  loan: number;
  status: "Approved" | "Pending" | "Rejected";
}

const chartData = [
  { name: "Mon", v: 3200 },
  { name: "Tue", v: 4500 },
  { name: "Wed", v: 4100 },
  { name: "Thu", v: 5800 },
  { name: "Fri", v: 5200 },
  { name: "Sat", v: 6900 },
  { name: "Sun", v: 7200 },
];

const rows: LoanRow[] = [
  {
    id: 1,
    name: "Somchai A.",
    phone: "089xxxxxxx",
    loan: 50000,
    status: "Pending",
  },
  {
    id: 2,
    name: "Anan B.",
    phone: "081xxxxxxx",
    loan: 120000,
    status: "Approved",
  },
  {
    id: 3,
    name: "Nida C.",
    phone: "086xxxxxxx",
    loan: 80000,
    status: "Rejected",
  },
  {
    id: 4,
    name: "Piti D.",
    phone: "082xxxxxxx",
    loan: 25000,
    status: "Approved",
  },
];

const columns: GridColDef<LoanRow>[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => (
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Avatar
          sx={{
            bgcolor: alpha("#555", 0.1),
            color: "#ccc",
            width: 28,
            height: 28,
            fontSize: 10,
          }}
        >
          {params.value[0]}
        </Avatar>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      </Stack>
    ),
  },
  {
    field: "loan",
    headerName: "Loan Amount",
    flex: 1,
    valueFormatter: (value) => `฿${value}`,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      const status = params.value as LoanRow["status"];
      const color =
        status === "Approved"
          ? "#32d74b"
          : status === "Pending"
            ? "#ffd60a"
            : "#ff453a";
      return (
        <Chip
          label={status}
          size="small"
          variant="outlined"
          sx={{
            borderRadius: "6px",
            borderColor: alpha(color, 0.3),
            color: color,
            fontSize: "11px",
          }}
        />
      );
    },
  },
];

export default function DashboardPage() {
  const { fetchStatus, mainStatus } = useStatusMainStore();
  const router = useRouter();
  const { fetchUsers, fetchUserDetail, userDeail } = useUserStore();
  const { data: session, status } = useSession();
  const { fetchLoan, dataLoan } = useLoanContactStore();
  const stats = [
    {
      title: "จำนวนสัญญา",
      value: mainStatus?.totalContracts ?? 0,
      icon: CreditCard,
      color: "#bf5af2",
      // change: calcPercentChange()
    },
    {
      title: "รออนุมัติ",
      value: mainStatus?.pendingAmount ?? 0,
      icon: HourglassTop,
      color: "#00f2ff",
    },
    {
      title: "อนุมัติแล้ว",
      value: mainStatus?.approvedAmount
        ? `${mainStatus.approvedAmount.toLocaleString()} ฿`
        : "0 ฿",
      icon: CheckCircle,
      color: "#32d74b",
    },
    {
      title: "วงเงินที่ใช้คืน",
      value: `฿${mainStatus?.usedAmount?.toLocaleString() ?? 0}`,
      icon: Banknote,
      color: "#ffd60a",
    },
  ];
  const baseButton = {
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 600,
    minWidth: 140,
  };

  const buttonStyleDark = {
    ...baseButton,
    bgcolor: "primary.dark",
    color: "#000",
  };

  const buttonStyleLight = {
    ...baseButton,
    bgcolor: "primary.light",
    color: "#000",
  };

  const buttonStyleLogout = {
    ...baseButton,
    bgcolor: "error.light",
    color: "#000",
    width: "20px",
  };

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!session?.user) return;
    if (fetchedRef.current) return;

    fetchedRef.current = true;
    fetchUserDetail(session.user.id, session.user.backendToken);
  }, [session?.user, fetchUserDetail]);

  useEffect(() => {
    if (!userDeail?.id) return;
    fetchLoan(userDeail.id);
    fetchStatus(userDeail.id);
    console.log(mainStatus, "mainStatus");
  }, [userDeail?.id, fetchStatus, fetchLoan]);
  const roles = session?.user?.userRoles?.map((ur: any) => ur.role.name);

  const isUser = roles?.includes("ADMIN");

  // const called = useRef(false);

  // useEffect(() => {
  //   if (!session?.user || called.current) return;

  //   const role = session.user.userRoles.find(
  //     (r: any) => r.role.name === "ADMIN",
  //   );

  //   if (!role) {
  //     console.warn("ADMIN role not found");
  //     return;
  //   }

  //   called.current = true;
  //   fetchUsers(role.role.apiSecret, session.user.backendToken);
  // }, [session?.user?.id]);

  const movePage = () => {
    router.push("/personalized");
  };
  const formContact = () => {
    router.push("/formLoanContact");
  };
  const ListContact = () => {
    router.push("/loanContactApproval");
  };
  const handleLogout = async () => {
    await signOut({ redirect: false });
    useUserStore.getState().logout();
    window.location.href = "/login";
  };
  return (
    <Box sx={{ p: 2, pt: 6 }}>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* HEADER */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", sm: "flex-start" },
            flexWrap: "wrap",
            gap: 1.5,
            mb: 4,
          }}
        >
          <Button
            onClick={movePage}
            variant="contained"
            disableElevation
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "primary.dark",
              color: "#000",
              minWidth: { xs: "120px", sm: "160px" },
            }}
          >
            ข้อมูลส่วนตัว
          </Button>

          <Button
            onClick={formContact}
            variant="contained"
            disableElevation
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "primary.light",
              color: "#000",
              minWidth: { xs: "120px", sm: "160px" },
            }}
          >
            กู้ยืมสินเชื่อ
          </Button>

          {isUser && (
            <Button
              onClick={ListContact}
              variant="contained"
              disableElevation
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "primary.light",
                color: "#000",
                minWidth: { xs: "120px", sm: "160px" },
              }}
            >
              รายการกู้สินเชื่อ
            </Button>
          )}
        </Box>

        {/* <IconButton
            onClick={handleLogout}
            sx={{
              bgcolor: "error.light",
              color: "#000",
              borderRadius: "10px",
              p: 1.2,
              "&:hover": {
                bgcolor: "error.main",
              },
            }}
          >
            <LogOutIcon />
          </IconButton> */}

        {/* STATS GRID - ใช้ Grid v2 size prop */}
        <StatsGrid stats={stats} />
        {/* MAIN CONTENT - Grid v2 size prop */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Card
              sx={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3 }}>
                  Transaction Volume
                </Typography>
                <Box sx={{ height: 300, width: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#00f2ff"
                            stopOpacity={0.15}
                          />
                          <stop
                            offset="95%"
                            stopColor="#00f2ff"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.05)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#666", fontSize: 11 }}
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="#00f2ff"
                        strokeWidth={2}
                        fill="url(#colorV)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* TABLE */}
          <LoanTable loans={dataLoan} />
        </Grid>
      </Box>
    </Box>
  );
}
