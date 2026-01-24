"use client";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  Box,
  Typography,
  CircularProgress,
  Divider,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useUserStore } from "@/src/stores/user.store";

import ToastAlert from "@/src/components/ToastAlert";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/Loading";
import { CreateLoanContractBody } from "@/src/types/loanContact";
import { useLoanContactStore } from "@/src/stores/loanContact.store ";
import { time } from "console";

export default function UsersInformationForm() {
  const route = useRouter();

  // const [date, setDate] = useState<Dayjs | null>(null);
  const { data: session } = useSession();
  const { createLoanContact, updateLoanContact, status } =
    useLoanContactStore();
  const { fetchUser, user } = useUserStore();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const TermOptions = [
    { months: 2, label: "2 เดือน", interestRate: 2.5 },
    { months: 4, label: "4 เดือน", interestRate: 3.0 },
    { months: 6, label: "6 เดือน", interestRate: 3.5 },
    { months: 10, label: "10 เดือน", interestRate: 3.8 },
    { months: 12, label: "12 เดือน", interestRate: 4.0 },
  ];
  const [termMonths, setTermMonths] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const { fetchUserDetail, userDeail } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<CreateLoanContractBody>({
    loanAmount: null,
    interestRate: interestRate,
    termMonths: termMonths,
    loanType: "effective",
    startDate: new Date(),
    usersInformationId: "",
  });

  // 1. fetch user เมื่อ session พร้อม
  useEffect(() => {
    if (session?.user?.id && session?.user?.backendToken) {
      fetchUser(session.user.id, session.user.backendToken);
    }
  }, [session?.user?.id, session?.user?.backendToken]);

  useEffect(() => {
    if (!user) return;

    if (!user.usersInformationId) {
      setToast({
        open: true,
        message: "โปรดกรอกข้อมูลส่วนตัว",
        severity: "info",
      });

      const timer = setTimeout(() => {
        route.push("/personalized");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  // useEffect(() => {
  //   if (userDeail?.JobDetail) {
  //     setForm(userDeail.JobDetail);
  //   }
  // }, [userDeail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleSelectChange = (e: any) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (!user) {
        return route.push("/personalized");
      }

      const payload: CreateLoanContractBody = {
        loanAmount: Number(form.loanAmount),
        interestRate: Number(form.interestRate),
        termMonths: Number(form.termMonths),
        loanType: form.loanType,
        startDate: form.startDate,
        usersInformationId: user?.usersInformationId,
      };
      console.log(payload);
      const res = await createLoanContact(payload);

      if (res) {
        setToast({
          open: true,
          message: "สร้างสัญญาเงินกู้สำเร็จ",
          severity: "success",
        });

        setTimeout(() => {
          route.push("/");
        }, 1500);
      } else {
        throw new Error("Create loan failed");
      }
    } catch (error) {
      console.error(error);

      setToast({
        open: true,
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3, // p-6
        // pt: {
        //   xs: 1,
        //   sm: 2,
        //   md: 6,
        //   lg: 12,
        //   xl: 12,
        // },
      }}
    >
      <ToastAlert
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
      {isLoading ? <Loading /> : !isLoading}
      <form
        onSubmit={handleSubmit}
        className="xs:pt-20 border border-white/20 rounded-2xl p-8 max-w-6xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-md"
      >
        <div className="pb-10">
          {" "}
          <p className=" text-2xl font-bold text-center mb-8 transition-colors duration-300">
            กู้สินเชื่อ
          </p>
          <Divider />
        </div>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              required
              fullWidth
              id="loanAmount"
              name="loanAmount"
              label="จำนวนเงินที่ต้องการ (บาท)"
              variant="filled"
              type="number" // ✅ สำคัญ
              value={form.loanAmount ?? ""}
              onChange={handleChange}
              // inputProps={{
              //   min: 0,
              //   step: 100, // 👈 ปรับตาม business
              // }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="loanType-label">วัตถุประสงค์</InputLabel>
              <Select
                labelId="loanType-label"
                id="loanType"
                name="loanPurpose"
                value={form.loanType ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    loanType: e.target.value,
                  }))
                }
              >
                <MenuItem value="">เลือกวัตถุประสงค์</MenuItem>
                <MenuItem value="emergency">ค่าใช้จ่ายฉุกเฉิน</MenuItem>
                <MenuItem value="medical">ค่ารักษาพยาบาล</MenuItem>
                <MenuItem value="education">ค่าเล่าเรียน / การศึกษา</MenuItem>
                <MenuItem value="home_repair">
                  ปรับปรุงบ้าน / ซ่อมแซมบ้าน
                </MenuItem>
                <MenuItem value="vehicle">ซื้อรถ / ซ่อมรถ</MenuItem>
                <MenuItem value="appliance">ซื้อเครื่องใช้ไฟฟ้า</MenuItem>
                <MenuItem value="travel">ท่องเที่ยว</MenuItem>
                <MenuItem value="debt_refinance">ชำระหนี้เดิม</MenuItem>
                <MenuItem value="personal">ใช้จ่ายส่วนตัว</MenuItem>
                <MenuItem value="other">อื่นๆ</MenuItem>
              </Select>
              {/* <FormHelperText>
                เลือกวัตถุประสงค์ที่ใกล้เคียงกับการใช้งานจริงมากที่สุด
              </FormHelperText> */}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="termMonths-label">ระยะเวลาผ่อน</InputLabel>
              <Select
                value={form.termMonths ?? ""}
                onChange={(e) => {
                  const months = Number(e.target.value);

                  setForm((prev) => ({
                    ...prev,
                    termMonths: months,
                    interestRate: found?.interestRate ?? 0,
                  }));

                  const found = TermOptions.find((t) => t.months === months);
                  setInterestRate(found?.interestRate ?? 0);
                }}
              >
                <MenuItem value="">เลือกจำนวนเดือน</MenuItem>

                {TermOptions.map((opt) => (
                  <MenuItem key={opt.months} value={opt.months}>
                    {opt.label} (ดอกเบี้ย {opt.interestRate}%)
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                ระยะเวลาผ่อนมีผลต่อยอดผ่อนต่อเดือนและดอกเบี้ยรวม
              </FormHelperText>
            </FormControl>
          </Grid>
          <p className="text-xs text-gray-500 mt-6 leading-relaxed">
            หมายเหตุ: ข้อมูลที่แสดงเป็นเพียงการคำนวณเบื้องต้น
            อัตราดอกเบี้ยและเงื่อนไขจริงอาจเปลี่ยนแปลงตามผลการพิจารณา
            บริษัทขอสงวนสิทธิ์ในการอนุมัติสินเชื่อ
          </p>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              sx={(theme) => ({
                mt: 4,
                py: 1.5,
                borderRadius: 6,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 1px 10px #A9B6DE"
                    : "0 1px 10px #252F4A",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(to right,#9891CC,#7799F7)"
                    : "linear-gradient(to right,#2563eb,#7c3aed)",

                fontWeight: 600,
                "&:hover": {
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(to right,#2563eb,#7c3aed)"
                      : "linear-gradient(to right,#1d4ed8,#6d28d9)",
                },
              })}
              startIcon={
                isLoading && <CircularProgress size={18} color="inherit" />
              }
            >
              {isLoading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
