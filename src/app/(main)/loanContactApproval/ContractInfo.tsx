import { Paper, Typography, Divider } from "@mui/material";
import { formatDateTH } from "../../helper/formatDateTH";
import { formatCurrency } from "../../helper/formatCurrencyTHB";

export default function BorrowerInfo({ loan }: { loan: any }) {
  const user = loan.usersInformation;
  const bank = user.bankInformation;

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
      <Typography variant="h6" fontWeight={600} mb={2}>
        รายละเอียดสัญญาเงินกู้
      </Typography>

      {/* ===== Loan Info ===== */}
      <Section title="ข้อมูลสัญญา">
        <Info label="เลขที่สัญญา" value={loan.loanNo} />
        <Info label="วงเงินกู้" value={formatCurrency(loan.loanAmount)} />
        <Info
          label="ระยะเวลา"
          value={`${loan.termMonths} เดือน`}
        />
        <Info
          label="ดอกเบี้ย"
          value={`${loan.interestRate}%`}
        />
        <Info
          label="ค่างวดต่อเดือน"
          value={formatCurrency(loan.installmentPerMonth)}
        />
        <Info
          label="วันที่เริ่มสัญญา"
          value={formatDateTH(loan.startDate)}
        />
      </Section>

      <Divider sx={{ my: 3 }} />

      {/* ===== User Info ===== */}
      <Section title="ข้อมูลผู้กู้">
        <Info
          label="ชื่อ - นามสกุล"
          value={`${user.firstName} ${user.lastName}`}
        />
        <Info label="เลขบัตรประชาชน" value={user.citizenId} />
        <Info label="เบอร์โทรศัพท์" value={user.phone} />
        <Info label="ที่อยู่" value={user.currentAddress} />
        <Info
          label="วันเกิด"
          value={formatDateTH(user.dateOfBirth)}
        />
        <Info label="สถานภาพ" value={user.maritalStatus} />
      </Section>

      <Divider sx={{ my: 3 }} />

      {/* ===== Bank Info ===== */}
      <Section title="ข้อมูลธนาคาร">
        <Info label="ธนาคาร" value={bank.bankName} />
        <Info label="ชื่อบัญชี" value={bank.bankAccountName} />
        <Info label="เลขบัญชี" value={bank.bankAccountNumber} />
        <Info label="ประเภทบัญชี" value={bank.accountType} />
        <Info
          label="รายได้ต่อเดือน"
          value={formatCurrency(bank.monthlyIncome)}
        />
        <Info
          label="รายจ่ายต่อเดือน"
          value={formatCurrency(bank.monthlyExpense)}
        />
        <Info
          label="ภาระหนี้ต่อเดือน"
          value={formatCurrency(bank.debtInstallmentPerMonth)}
        />
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
      <Typography
        variant="subtitle1"
        fontWeight={600}
        mb={1.5}
        color="primary"
      >
        {title}
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {children}
      </div>
    </>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={500}>
        {value || "-"}
      </Typography>
    </div>
  );
}
