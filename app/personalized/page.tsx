"use client";

import { TextField, Button, LinearProgress } from "@mui/material";
import { useUploadFileStore } from "../stores/uploadFile.store";
import { UsersInformation } from "../types/userInfomation.type";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCreateUserInformationStore } from "../stores/userInformation.store";

export default function UsersInformationForm() {
  const { files, uploadFile, uploading, uploadProgress, uploadError } =
    useUploadFileStore();
  const { data: session } = useSession();
  const createInformation = useCreateUserInformationStore(
    (state) => state.createInformation
  );
  const [form, setForm] = useState<UsersInformation>({
    full_name: "",
    userId: "",
    last_name: "",
    tel: "",
    address: "",
    province: "",
    district: "",
    sub_district: "",
    zip_code: "",
    id_card: "",
    date_of_birth: "",
    number_back_card: "",
    work_place: "",
    position_work: "",
    salary: "",
    age_work: "",
    cardImage: "",
    statementImage: "",
    certificateImage: "",
    status: "ative",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload: UsersInformation = {
      ...form,
      userId: session?.user?.id || "",
      cardImage: files.card?.url ?? "",
      statementImage: files.statement?.url ?? "",
      certificateImage: files.certificate?.url ?? "",
    };

    console.log("SUBMIT PAYLOAD:", payload);

    createInformation(payload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f1a] to-black flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 max-w-6xl w-full shadow-xl"
      >
        <h1 className="text-3xl text-white font-bold text-center mb-8">
          Users Information
        </h1>

        {/* INPUT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            ["ชื่อ", "full_name"],
            ["นามสกุล", "last_name"],
            ["เบอร์โทร", "tel"],
            ["วันเกิด", "date_of_birth", "date"],
            ["เลขบัตรประชาชน", "id_card"],
            ["เลขหลังบัตร", "number_back_card"],
            ["จังหวัด", "province"],
            ["อำเภอ", "district"],
            ["ตำบล", "sub_district"],
            ["รหัสไปรษณีย์", "zip_code"],
            ["สถานที่ทำงาน", "work_place"],
            ["ตำแหน่งงาน", "position_work"],
            ["เงินเดือน", "salary"],
            ["อายุงาน", "age_work"],
          ].map(([label, name, type]) => (
            <TextField
              key={name}
              label={label}
              name={name}
              type={type || "text"}
              value={form[name as keyof UsersInformation]}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{ style: { color: "#9ca3af" } }}
              sx={{
                input: { color: "white", background: "rgba(255,255,255,0.05)" },
                fieldset: { borderColor: "rgba(255,255,255,0.2)" },
              }}
            />
          ))}
        </div>

        {/* ADDRESS */}
        <div className="mt-5">
          <TextField
            label="ที่อยู่"
            name="address"
            value={form.address}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            InputLabelProps={{ style: { color: "#9ca3af" } }}
            sx={{
              textarea: { color: "white" },
              fieldset: { borderColor: "rgba(255,255,255,0.2)" },
            }}
          />
        </div>

        {/* UPLOAD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {(["card", "statement", "certificate"] as const).map((key) => {
            const label =
              key === "card"
                ? "รูปบัตรประชาชน"
                : key === "statement"
                ? "Statement"
                : "หนังสือรับรอง";

            const file = files[key];

            return (
              <div
                key={key}
                className="bg-black/40 border border-white/10 rounded-xl p-4 text-center"
              >
                <p className="text-gray-300 mb-2">{label}</p>

                {file ? (
                  <img
                    src={file.url}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="h-40 flex items-center justify-center text-gray-500 border border-dashed rounded">
                    ไม่มีรูป
                  </div>
                )}

                {uploading && <LinearProgress />}

                {uploadError && (
                  <p className="text-red-400 text-sm mt-1">{uploadError}</p>
                )}

                <input
                  type="file"
                  hidden
                  id={key}
                  onChange={(e) =>
                    e.target.files && uploadFile(e.target.files[0], key)
                  }
                />

                <label
                  htmlFor={key}
                  className="block mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded cursor-pointer transition"
                >
                  {file ? "เปลี่ยนรูป" : "เลือกรูป"}
                </label>
              </div>
            );
          })}
        </div>

        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
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
