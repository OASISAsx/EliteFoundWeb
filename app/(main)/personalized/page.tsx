"use client";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { useUploadFileStore } from "@/stores/uploadFile.store";
import { CreateUserInformationInput } from "@/types/userInfomation.type";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCreateUserInformationStore } from "@/stores/userInformation.store";
import { DatePicker } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";
import UploadIDCard from "@/components/UploadIDCard";

export default function UsersInformationForm() {
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
  const createInformation = useCreateUserInformationStore(
    (state) => state.createInformation,
  );
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

    currentAddress: "",
    registeredAddress: null,
    province: "",
    district: "",
    zipcode: "",

    occupation: "",
    companyName: null,
    companyAddress: null,
    position: null,
    salaryPerMonth: 0,
    otherIncome: 0,
    workYears: 0,
    employmentType: "fulltime",

    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",

    monthlyExpense: 0,
    existingDebt: false,
    debtAmount: 0,
    debtInstallmentPerMonth: 0,

    id_card_image: "",
    idCardFile: null,
    salarySlipUpload: [],
    selfie_with_id: "",
    salary_slip: [],
    bank_statement: "",
    house_document: "",
    other_files: [],
  });

  // const handleChange = (e: any) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
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

    const cardPromise = form.idCardFile
      ? uploadFile(form.idCardFile, "card")
      : Promise.resolve(null);

    const salaryPromise =
      form.salarySlipUpload && form.salarySlipUpload.length > 0
        ? uploadMultiple(form.salarySlipUpload)
        : Promise.resolve([]);

    const [cardFile, salaryFiles] = await Promise.all([
      cardPromise,
      salaryPromise,
    ]);

    const cardUrl = cardFile?.url ?? "";

    const salarySlipList = Array.isArray(salaryFiles)
      ? salaryFiles.filter((f) => f?.url).map((f) => f.url)
      : [];

    const payload: CreateUserInformationInput = {
      ...form,
      id_card_image: cardUrl,
      salary_slip: salarySlipList,
    };

    console.log("SUBMIT PAYLOAD:", payload);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className=" border border-white/10 rounded-2xl p-8 max-w-6xl w-full shadow-xl"
      >
        <p className=" text-2xl font-bold text-center mb-8 transition-colors duration-300">
          ข้อมูลส่วนตัว
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              // required
              fullWidth
              id="firstName"
              name="firstName"
              label="ชื่อ"
              variant="filled"
              value={form.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="citizenId"
              name="citizenId"
              label="เลขบัตรประชาชน"
              variant="filled"
              value={form.citizenId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              className="w-xl"
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="gender-label">เพศ</InputLabel>
              <Select
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="phone"
              name="phone"
              label="เบอร์โทรศัพท์"
              variant="filled"
              value={form.phone || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="maritalStatus-label">สถานภาพ</InputLabel>
              <Select
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
          <Grid item xs={12} sm={12}>
            {" "}
            <UploadIDCard
              onChange={(file) =>
                setForm((prev) => ({
                  ...prev,
                  idCardFile: file,
                }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="p-6" id="salarySlipUpload-label">
              สลิปเงินเดือน (ย้อนหลัง 3 เดือน)
            </InputLabel>
            <Input
              required
              className="pt-6"
              type="file"
              inputProps={{ multiple: true, accept: "image/*" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (!files) return;

                setForm((prev) => ({
                  ...prev,
                  salarySlipUpload: Array.from(files),
                }));
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
            borderRadius: 6,
            background: "linear-gradient(to right,#3b82f6,#8b5cf6)",
            color: "white",
            fontWeight: 600,
          }}
        >
          บันทึกข้อมูล
        </Button>
      </form>
    </div>
  );
}
