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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";

import { useUploadFileStore } from "@/stores/uploadFile.store";
import { CreateUserInformationInput } from "@/types/userInfomation.type";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserInformationStore } from "@/stores/userInformation.store";

import dayjs, { Dayjs } from "dayjs";
import UploadIDCard from "@/components/UploadIDCard";
import CustomDatePicker from "@/components/DatePickerCustome";
import { useUserStore } from "@/stores/user.store";
import AddressSelect from "@/components/AddressSelect";
import ToastAlert from "@/components/ToastAlert";
import { useRouter } from "next/navigation";

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
  const { fetchUserInformation, createInformation, updateInformation } =
    useUserInformationStore();
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
  const [form, setForm] = useState<jobDetail>({
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
    if (userDeail?.jobDetail) {
      setForm(userDeail.jobDetail);
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

      const salaryPromise =
        otherFiles && otherFiles.length > 0
          ? uploadMultiple(otherFiles)
          : Promise.resolve([]);

      const [salaryFiles] = await Promise.all([salaryPromise]);

      const otherFilesList = Array.isArray(salaryFiles)
        ? salaryFiles.filter((f) => f?.url).map((f) => f.url)
        : [];

      const payload: jobDetail = {
        ...form,
        salarySlip:
          otherFilesList.length > 0 ? otherFilesList : form.salarySlip,
      };

      if (userDeail?.jobDetail) {
        await updateInformation(payload, userDeail?.jobDetail);
      } else {
        await createInformation(payload);
      }
      route.push("/");
      setToast({
        open: true,
        message: "บันทึกข้อมูลสำเร็จ",
        severity: "success",
      });
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
    <div className="min-h-screen flex justify-center items-center p-6 sm:pt-4 pt-12">
      <form
        onSubmit={handleSubmit}
        className=" xs:pt-20 border border-white/10 rounded-2xl p-8 max-w-6xl w-full shadow-xl"
      >
        <ToastAlert
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
        />

        <p className=" text-2xl font-bold text-center mb-8 transition-colors duration-300">
          รายละเอียดการทำงาน
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={4} md={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 6,
                background: "linear-gradient(to right,#3b82f6,#8b5cf6)",
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(to right,#2563eb,#7c3aed)",
                },
              }}
              startIcon={
                isLoading && <CircularProgress size={18} color="inherit" />
              }
            >
              {isLoading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
