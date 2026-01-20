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

import { useUploadFileStore } from "@/src/stores/uploadFile.store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserInformationStore } from "@/src/stores/userInformation.store";

import { useUserStore } from "@/src/stores/user.store";

import ToastAlert from "@/src/components/ToastAlert";
import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import Loading from "@/src/components/Loading";
import {
  BankCrateAndUpdate,
  BankInformation,
} from "@/src/types/bankInformation.type";
import useUserUserBankStore from "@/src/stores/bankInformation.store";

export default function UsersInformationForm() {
  const route = useRouter();
  const {
    files,
    uploadFile,
    uploadMultiple,
    uploading,
    uploadProgress,
    uploadError,
  } = useUploadFileStore();
  const { data: session } = useSession();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const [salaryPreviews, setSalaryPreviews] = useState<string[]>([]);
  const [salaryFiles, setSalaryFiles] = useState<File[]>([]);
  const { fetchBank, bankData, createBank, updateBank } =
    useUserUserBankStore();
  const { fetchUserInformation, userInformation } = useUserInformationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<BankInformation>({
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankBranch: "",
    accountType: "",
    monthlyIncome: 0,
    monthlyExpense: 0,
    debtInstallmentPerMonth: 0,
    kycStatus: "",
    bankStatementFiles: [],
    passbookImage: "",
  });

  useEffect(() => {
    if (!session?.user?.id) return;
    fetchUserInformation(session.user.id);
  }, [session?.user?.id]);

  useEffect(() => {
    console.log(bankData, "BankInformation 1");
  }, [bankData]);

  useEffect(() => {
    if (!userInformation?.id) return;
    console.log(userInformation, "userInformation");
    fetchBank(userInformation?.id);
    // console.log(bankData, "BankInformation");
  }, [userInformation?.id]);

  useEffect(() => {
    if (!bankData) return;

    setForm((prev) => ({
      ...prev,
      ...bankData,
    }));
  }, [bankData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInformation) return;

    try {
      setIsLoading(true);

      const FilesSlip =
        salaryFiles && salaryFiles.length > 0
          ? await uploadMultiple(salaryFiles)
          : [];

      const otherFilesList = FilesSlip.filter((f) => f?.url).map((f) => f.url);

      const payload: BankCrateAndUpdate = {
        ...form,
        bankStatementFiles:
          otherFilesList.length > 0 ? otherFilesList : form.bankStatementFiles,
        usersInformationId: userInformation?.id,
      };

      if (bankData?.id) {
        await updateBank(payload, bankData.id);
      } else {
        await createBank(payload);
      }
      if (bankData) {
        setToast({
          open: true,
          message: "บันทึกข้อมูลสำเร็จ",
          severity: "success",
        });
        route.push("/");
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
            รายละเอียดธนาคาร
          </p>
          <Divider />
        </div>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              required
              fullWidth
              id="bankName"
              name="bankName"
              label="ชื่อธนาคาร"
              variant="filled"
              value={form.bankName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="bankAccountName"
              name="bankAccountName"
              label="bankAccountName"
              variant="filled"
              value={form.bankAccountName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="bankAccountNumber"
              name="bankAccountNumber"
              label="bankAccountNumber"
              variant="filled"
              value={form.bankAccountNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="bankBranch"
              name="bankBranch"
              label="สาขา"
              variant="filled"
              value={form.bankBranch}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="employmentType-label">ประเภทการบัญชี</InputLabel>
              <Select
                required
                labelId="accountType-label"
                id="accountType"
                name="accountType"
                value={form.accountType || ""}
                onChange={handleSelectChange}
              >
                <MenuItem value="saving">ออมทรัพย์</MenuItem>
                <MenuItem value="current">กระแสรายวัน</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="monthlyExpense"
              name="monthlyExpense"
              label="ค่าใช้จ่ายต่อเดือน"
              variant="filled"
              value={form.monthlyExpense}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              label="รายได้อื่นๆ"
              variant="filled"
              value={form.monthlyIncome}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              type="number"
              id="debtInstallmentPerMonth"
              name="debtInstallmentPerMonth"
              label="หนี้ที่ต้องชำระต่อเดือน"
              variant="filled"
              value={form.debtInstallmentPerMonth}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <InputLabel id="otherFiles-label">
              Statement (ย้อนหลัง 6 เดือน)
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

            {form.bankStatementFiles && form.bankStatementFiles.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2">
                  เอกสารที่อัปโหลดแล้ว
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                  {form.bankStatementFiles.map((url: string, index: number) => (
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
          </Grid>
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
