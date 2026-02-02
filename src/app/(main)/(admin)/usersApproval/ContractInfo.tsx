import {
  Paper,
  Typography,
  Divider,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { formatDateTH } from "@/src/app/helper/formatDateTH";
import { formatCurrency } from "@/src/app/helper/formatCurrencyTHB";
import { useRouter } from "next/navigation";

export default function BorrowerInfo({ loan }: { loan: any }) {
  const user = loan.usersInformation;
  const job = user?.JobDetail;
  const route = useRouter();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* ===== Header ===== */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          รายละเอียดผู้กู้
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            window.open(`/usersApproval/${loan.id}/pdf`, "_blank");
          }}
        >
          ดาวน์โหลด PDF
        </Button>
      </Box>
      {/* ===== Personal Info ===== */}
      <Section title="ข้อมูลส่วนตัว">
        <Info
          label="ชื่อ - นามสกุล"
          value={`${user?.firstName || ""} ${user?.lastName || ""}`}
        />
        <Info label="เลขบัตรประชาชน" value={user?.citizenId} />
        <Info label="เบอร์โทรศัพท์" value={user?.phone} />
        <Info label="เพศ" value={user?.gender} />
        <Info label="วันเกิด" value={formatDateTH(user?.dateOfBirth)} />
        <Info label="สถานภาพสมรส" value={user?.maritalStatus} />
        <Info label="สัญชาติ" value={user?.nationality} />
      </Section>

      <Divider sx={{ my: 3 }} />

      {/* ===== Address ===== */}
      <Section title="ที่อยู่ปัจจุบัน">
        <Info label="ที่อยู่" value={user?.currentAddress} />
        <Info label="จังหวัด" value={user?.provinceCode} />
        <Info label="อำเภอ" value={user?.districtCode} />
        <Info label="ตำบล" value={user?.subdistrictCode} />
        <Info label="รหัสไปรษณีย์" value={user?.zipcode} />
      </Section>

      <Divider sx={{ my: 3 }} />

      {/* ===== Job Info ===== */}
      <Section title="ข้อมูลการทำงาน">
        <Info label="บริษัท" value={job?.companyName} />
        <Info label="ที่อยู่บริษัท" value={job?.companyAddress} />
        <Info label="อาชีพ" value={job?.occupation} />
        <Info label="ตำแหน่ง" value={job?.position} />

        <Info
          label="รายได้ต่อเดือน"
          value={formatCurrency(job?.salaryPerMonth)}
        />
        <Info label="รายได้อื่น ๆ" value={formatCurrency(job?.otherIncome)} />
        <Info label="อายุงาน (ปี)" value={job?.workYears} />
        <Info label="ประเภทงาน" value={job?.employmentType} />
        <Info label="วันเริ่มงาน" value={formatDateTH(job?.startDate)} />
      </Section>
    </Paper>
  );
}

/* ===== Reusable Components ===== */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Typography variant="subtitle1" fontWeight={600} pb={5} color="primary">
        {title}
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {children}
      </div>
    </>
  );
}

function Info({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
}: {
  label: string;
  value?: string | number;
  type?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TextField
      fullWidth
      label={label}
      variant="filled"
      value={value ?? ""}
      onChange={onChange}
      type={type}
      InputProps={{ readOnly }}
    />
  );
}
