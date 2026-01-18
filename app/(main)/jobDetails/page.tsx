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

import { useUploadFileStore } from "@/stores/uploadFile.store";
import { CreateUserInformationInput } from "@/types/userInfomation.type";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserInformationStore } from "@/stores/userInformation.store";

import { useUserStore } from "@/stores/user.store";

import ToastAlert from "@/components/ToastAlert";
import { useRouter } from "next/navigation";
import { JobDetail } from "@/types/jobDetail.type";
import { useUserJobDetailnStore } from "@/stores/jobDetail.store";

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
  // const [date, setDate] = useState<Dayjs | null>(null);
  const { data: session } = useSession();
  const { createJobDetail, updateJobDetail } = useUserJobDetailnStore();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const [salaryPreviews, setSalaryPreviews] = useState<string[]>([]);
  const [salaryFiles, setSalaryFiles] = useState<File[]>([]);

  const { fetchUserDetail, userDeail } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [idCardFile, setCardFile] = useState<File | null>(null);
  const [otherFiles, setOtherFiles] = useState<File[] | null>(null);
  const [form, setForm] = useState<JobDetail>({
    occupation: "",
    companyName: "",
    companyAddress: "",
    position: "",
    salaryPerMonth: 0,
    otherIncome: 0,
    workYears: 0,
    employmentType: "",
    salarySlip: [],
    usersInformationId: "",
  });
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserDetail(session.user.id);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (userDeail?.JobDetail) {
      setForm(userDeail.JobDetail);
    }
  }, [userDeail]);

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

    try {
      setIsLoading(true);
      if (!userDeail) {
        return route.push("/personalized");
      }
      const FilesSlip =
        salaryFiles && salaryFiles.length > 0
          ? await uploadMultiple(salaryFiles)
          : [];

      console.log(userDeail, "userDeail");

      const otherFilesList = FilesSlip.filter((f) => f?.url).map((f) => f.url);

      const payload: JobDetail = {
        ...form,
        salarySlip:
          otherFilesList.length > 0 ? otherFilesList : form.salarySlip,
        usersInformationId: userDeail.id,
      };

      if (userDeail?.JobDetail?.id) {
        await updateJobDetail(payload, userDeail.JobDetail.id);
      } else {
        await createJobDetail(payload);
      }

      setIsLoading(true);

      setTimeout(() => {
        setToast({
          open: true,
          message: "บันทึกข้อมูลสำเร็จ",
          severity: "success",
        });

        setTimeout(() => {
          route.push("/");
        }, 600);
      }, 400);
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
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <CircularProgress />
        </div>
      )}
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="companyName"
              name="companyName"
              label="บริษัท"
              variant="filled"
              value={form.companyName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              rows={3}
              multiline
              fullWidth
              id="companyAddress"
              name="companyAddress"
              label="ที่อยู่บริษัท"
              variant="filled"
              value={form.companyAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="occupation"
              name="occupation"
              label="อาชีพ"
              variant="filled"
              value={form.occupation}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="employmentType-label">
                ประเภทการจ้างงาน
              </InputLabel>
              <Select
                required
                labelId="employmentType-label"
                id="employmentType"
                name="employmentType"
                value={form.employmentType || ""}
                onChange={handleSelectChange}
              >
                <MenuItem value="fulltime">งานประจำ</MenuItem>
                <MenuItem value="parttime">พนักงานพาร์ทไทม์</MenuItem>
                <MenuItem value="contract">พนักงานสัญญาจ้าง</MenuItem>
                <MenuItem value="temporary">พนักงานชั่วคราว</MenuItem>
                <MenuItem value="probation">ช่วงทดลองงาน</MenuItem>
                <MenuItem value="intern">นักศึกษาฝึกงาน</MenuItem>
                <MenuItem value="freelance">ฟรีแลนซ์</MenuItem>
                <MenuItem value="self_employed">
                  เจ้าของกิจการ / อาชีพอิสระ
                </MenuItem>
                <MenuItem value="business_owner">เจ้าของบริษัท</MenuItem>
                <MenuItem value="government">ข้าราชการ</MenuItem>
                <MenuItem value="state_enterprise">รัฐวิสาหกิจ</MenuItem>
                <MenuItem value="other">อื่นๆ</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
