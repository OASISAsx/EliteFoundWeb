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
  Snackbar,
  Alert,
  TextareaAutosize,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";

import { useUploadFileStore } from "@/src/stores/uploadFile.store";
import { CreateUserInformationInput } from "@/src/types/userInfomation.type";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserInformationStore } from "@/src/stores/userInformation.store";
import { DatePicker } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";
import UploadIDCard from "@/src/components/UploadIDCard";
import CustomDatePicker from "@/src/components/DatePickerCustome";
import { useUserStore } from "@/src/stores/user.store";
import AddressSelect from "@/src/components/AddressSelect";
import ToastAlert from "@/src/components/ToastAlert";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/Loading";
import { formatPhoneNumber } from "@/src/app/helper/formatPhoneNumber";

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

  const { fetchUserDetail, userDeail } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [idCardFile, setCardFile] = useState<File | null>(null);
  const [otherFiles, setOtherFiles] = useState<File[] | null>(null);
  const [form, setForm] = useState<CreateUserInformationInput>({
    firstName: "",
    lastName: "",
    citizenId: "",
    dateOfBirth: new Date(),
    gender: "",
    nationality: null,
    maritalStatus: null,
    phone: "",
    email: null,
    lineId: null,
    facebook: null,
    loanStatus: "pending",
    currentAddress: "",
    provinceCode: null,
    districtCode: null,
    subdistrictCode: null,
    zipcode: "",
    id_card_image: "",
    // idCardFile: null,
    // otherFiles: [],

    other_files: [],
  });
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserDetail(session.user.id);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (userDeail) {
      setForm(userDeail);
    }
  }, [userDeail]);

  const handleChangeTypePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. ดึงเฉพาะตัวเลขออกมา (Raw Value)
    const rawValue = e.target.value.replace(/\D/g, "").slice(0, 10);

    // 2. เก็บเฉพาะตัวเลขลงใน state (ไม่มีขีด)
    setForm({ ...form, phone: rawValue });
  };

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

      const cardPromise = idCardFile
        ? uploadFile(idCardFile, "card")
        : Promise.resolve(null);

      const salaryPromise =
        otherFiles && otherFiles.length > 0
          ? uploadMultiple(otherFiles)
          : Promise.resolve([]);

      const [cardFile, salaryFiles] = await Promise.all([
        cardPromise,
        salaryPromise,
      ]);

      const cardUrl = cardFile?.url ?? "";

      const otherFilesList = Array.isArray(salaryFiles)
        ? salaryFiles.filter((f) => f?.url).map((f) => f.url)
        : [];

      const payload: CreateUserInformationInput = {
        ...form,

        dateOfBirth: dayjs(form.dateOfBirth).toDate(),
        id_card_image: cardUrl || form.id_card_image,
        other_files:
          otherFilesList.length > 0 ? otherFilesList : form.other_files,
        userId: session?.user.id,
      };

      if (userDeail) {
        console.log(payload, "payload");
        await updateInformation(payload, userDeail.id!);
      } else {
        await createInformation(payload);
      }

      setIsLoading(true);

      setTimeout(() => {
        // setToast({
        //   open: true,
        //   message: "บันทึกข้อมูลสำเร็จ",
        //   severity: "success",
        // });

        setTimeout(() => {
          route.push("/jobDetails");
        }, 100);
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
          <p className=" text-2xl font-bold text-center mb-8 transition-colors duration-300">
            ข้อมูลส่วนตัว
          </p>
          <Divider />
        </div>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="firstName"
              name="firstName"
              label="ชื่อ"
              variant="filled"
              value={form.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="lastName"
              name="lastName"
              label="นามสกุล"
              variant="filled"
              value={form.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="citizenId"
              name="citizenId"
              label="เลขบัตรประชาชน"
              variant="filled"
              value={form.citizenId}
              // onChange={handleChange}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 13) {
                  setForm({ ...form, citizenId: value });
                }
              }}
              slotProps={{
                htmlInput: {
                  maxLength: 13,
                  inputMode: "numeric",
                },
              }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              pb: 2,
              "& .MuiInputBase-input": {
                fontWeight: 600,
              },
              "& .MuiInputLabel-root": {
                fontWeight: 600,
              },
            }}
          >
            <CustomDatePicker
              label="วันเดือนปีเกิด"
              value={dayjs(form.dateOfBirth)}
              onChange={(newValue) => {
                setForm((prev: any) => ({
                  ...prev,
                  dateOfBirth: newValue ? newValue.toDate() : null,
                }));
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="gender-label">เพศ</InputLabel>
              <Select
                required
                labelId="gender-label"
                id="gender"
                name="gender"
                value={form.gender || ""}
                onChange={handleSelectChange}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value="male">ชาย</MenuItem>
                <MenuItem value="female">หญิง</MenuItem>
                <MenuItem value="other">อื่นๆ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="nationality"
              name="nationality"
              label="สัญชาติ"
              variant="filled"
              value={form.nationality || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              required
              fullWidth
              id="phone"
              name="phone"
              label="เบอร์โทรศัพท์"
              variant="filled"
              // นำค่าจาก state มา format ก่อนแสดงผลในช่องกรอก
              value={formatPhoneNumber(form.phone || "")}
              onChange={handleChangeTypePhone}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                },
              }}
              placeholder="099-999-9999"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="maritalStatus-label">สถานภาพ</InputLabel>
              <Select
                required
                labelId="maritalStatus-label"
                id="maritalStatus"
                name="maritalStatus"
                value={form.maritalStatus || ""}
                onChange={handleSelectChange}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value="single">โสด</MenuItem>
                <MenuItem value="married">สมรส</MenuItem>
                <MenuItem value="divorced">หย่า</MenuItem>
                <MenuItem value="other">อื่นๆ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            {" "}
            <UploadIDCard
              value={idCardFile}
              previewUrl={form.id_card_image}
              onChange={(file) => {
                console.log(file, "file");
                setCardFile(file);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <AddressSelect
              value={{
                provinceCode: form.provinceCode,
                districtCode: form.districtCode,
                subdistrictCode: form.subdistrictCode,
                currentAddress: form.currentAddress,
              }}
              onChange={(val) =>
                setForm((prev) => ({
                  ...prev,
                  ...val,
                }))
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <InputLabel id="otherFiles-label">
              เอกสารอื่นๆ (เพื่อการอนุมัติง่ายขึ้น)
            </InputLabel>
            <Input
              className="pt-6"
              type="file"
              inputProps={{ multiple: true, accept: "image/*" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (!files) return;
                setOtherFiles(Array.from(files));
              }}
            />
            {form.other_files && form.other_files.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2">
                  เอกสารที่อัปโหลดแล้ว
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                  {form.other_files.map((url: string, index: number) => (
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
