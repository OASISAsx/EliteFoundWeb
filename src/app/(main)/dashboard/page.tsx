"use client";

import React from "react";
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
} from "@mui/material";

import {
  Users,
  CreditCard,
  Banknote,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
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

// ---------------- TYPES ----------------
interface LoanRow {
  id: number;
  name: string;
  phone: string;
  loan: number;
  status: "Approved" | "Pending" | "Rejected";
}

// ---------------- MOCK DATA ----------------
const stats = [
  {
    title: "Users",
    value: "1,280",
    icon: Users,
    color: "#00f2ff",
    change: "+12%",
  },
  {
    title: "Requests",
    value: "342",
    icon: CreditCard,
    color: "#bf5af2",
    change: "+5.4%",
  },
  {
    title: "Approved",
    value: "210",
    icon: CheckCircle,
    color: "#32d74b",
    change: "82%",
  },
  {
    title: "Volume",
    value: "฿12.5M",
    icon: Banknote,
    color: "#ffd60a",
    change: "+2.1M",
  },
];

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
  const router = useRouter();
  const movePage = () => {
    router.push("/personalized");
  };
  return (
    <Box sx={{ p: 2, pt: 6 }}>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* HEADER */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
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
            }}
          >
            ข้อมมูลส่วนตัว
          </Button>

          {/* <Box>
            <Typography
              variant="h4"
              fontWeight={900}
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(to right, #fff, #cbd5e1, #64748b)"
                    : "linear-gradient(to right, #0f172a, #334155, #64748b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DASHBOARD{" "}
            </Typography>
          </Box> */}
          {/* <Button
            variant="contained"
            disableElevation
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "primary.main",
              color: "#000",
            }}
          >
            View All
          </Button> */}
        </Stack>

        {/* STATS GRID - ใช้ Grid v2 size prop */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {stats.map((item, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  sx={{
                    //   bgcolor: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="start"
                    >
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: "10px",
                          bgcolor: alpha(item.color, 0.1),
                          color: item.color,
                        }}
                      >
                        <item.icon size={18} />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#32d74b",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <TrendingUp size={12} /> {item.change}
                      </Typography>
                    </Stack>
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", fontWeight: 500 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 800, lineHeight: 1.2 }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* MAIN CONTENT - Grid v2 size prop */}
        <Grid container spacing={3}>
          {/* CHART - กราฟอันเดียว */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Card
              sx={{
                //   bgcolor: "transparent",
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
          <Grid size={{ xs: 12, lg: 5 }}>
            <Card
              sx={{
                // bgcolor: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                boxShadow: "none",
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Latest Loan Requests
                </Typography>
                <Button
                  size="small"
                  endIcon={<ArrowUpRight size={14} />}
                  sx={{
                    color: "primary.main",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  View All
                </Button>
              </Box>
              <Box sx={{ height: 315, width: "100%", px: 1 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  hideFooter
                  disableRowSelectionOnClick
                  sx={{
                    border: "none",
                    "& .MuiDataGrid-columnHeaders": {
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid rgba(255,255,255,0.02)",
                    },
                    "& .MuiDataGrid-row:hover": {
                      bgcolor: "rgba(255,255,255,0.02)",
                    },
                    fontSize: "13px",
                  }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
