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

  useEffect(() => {
    if (session?.user?.id) {
      fetchUser(session.user.id, session.user.backendToken);
    }
  }, [session?.user?.id]);

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

      // if (res) {
      //   route.push("/bankInformation");
      // } else {
      //   setToast({
      //     open: true,
      //     message: "err",
      //     severity: "warning",
      //   });
      // }
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
        pt: {
          xs: 8,
          sm: 8,
          md: 10,
          lg: 12,
          xl: 12,
        },
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
            รายละเอียดการทำงาน
          </p>
          <Divider />
        </div>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              required
              fullWidth
              id="loanAmount"
              name="loanAmount"
              label="จำนวนเงินที่ต้องการ"
              variant="filled"
              value={form.loanAmount || ""}
              onChange={handleChange}
            />
          </Grid>
          {/* <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomDatePicker
              label="วันที่เริ่มงาน"
              value={dayjs(form.startDate)}
              onChange={(newValue) => {
                setForm((prev: any) => ({
                  ...prev,
                  startDate: newValue ? newValue.toDate() : null,
                }));
              }}
            />
          </Grid> */}
          {/* <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              required
              rows={3}
              multiline
              fullWidth
              id="companyAddress"
              name="companyAddress"
              label="ที่อยู่บริษัท"
              variant="filled"
              sx={{
                "& textarea": {
                  marginTop: "-30px",
                  marginLeft: "-10px",
                },
              }}
              value={form.companyAddress}
              onChange={handleChange}
            />
          </Grid> */}
          {/* <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="loanType"
              name="loanType"
              label="วัตถุประสงค์"
              variant="filled"
              value={form.loanType || ""}
              onChange={handleChange}
            />
          </Grid> */}

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="termMonths-label">วัตถุประสงค์</InputLabel>
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
            </FormControl>
          </Grid>
          {/* <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="position"
              name="position"
              label="ตำแหน่งงาน"
              variant="filled"
              value={form.position}
              onChange={handleChange}
            />
          </Grid> */}
          {/* <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              type="number"
              id="salaryPerMonth"
              name="salaryPerMonth"
              label="เงินเดือน"
              variant="filled"
              value={form.salaryPerMonth}
              onChange={handleChange}
            />
          </Grid> */}
          {/* <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              type="number"
              id="otherIncome"
              name="otherIncome"
              label="รายได้อื่นๆ"
              variant="filled"
              value={form.otherIncome}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              type="number"
              id="workYears"
              name="workYears"
              label="ระยะเวลาการทำงาน (ปี)"
              variant="filled"
              value={form.workYears}
              onChange={handleChange}
            />
          </Grid> */}

          {/* <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <InputLabel id="otherFiles-label">
              สลิปเงินเดือน (ย้อนหลัง 6 เดือน)
            </InputLabel>
            <Input
              className="pt-6"
              type="file"
              inputProps={{ multiple: true, accept: "image/*" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (!files) return;

                const arr = Array.from(files);

                setSalaryFiles(arr);

                const previews = arr.map((file) => URL.createObjectURL(file));
                setSalaryPreviews(previews);
              }}
            />
            {salaryPreviews.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2">รูปที่เลือก</Typography>

                <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                  {salaryPreviews.map((src, index) => (
                    <Image
                      key={index}
                      src={src}
                      alt={`preview-${index}`}
                      width={120}
                      height={80}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {form.salarySlip && form.salarySlip.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2">
                  เอกสารที่อัปโหลดแล้ว
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                  {form.salarySlip.map((url: string, index: number) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`file-${index}`}
                      width={120}
                      height={80}
                      style={{
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid> */}
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
