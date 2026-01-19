// ไฟล์ dayjs config (เช่น src/lib/dayjs.ts หรือ global setup)
import dayjs from "dayjs";
import "dayjs/locale/th"; // ภาษาไทย
import buddhistEra from "dayjs/plugin/buddhistEra"; // สำคัญมาก!

dayjs.extend(buddhistEra);
dayjs.locale("th");

// ถ้าอยากให้ default ใช้ พ.ศ. เสมอ (optional แต่แนะนำ)
dayjs().format("DD MMMM BBBB"); // ทดสอบ → ควรได้วันที่ปัจจุบันแบบ พ.ศ.

// -------------------------------------------------------

// ไฟล์ Component ของคุณ
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Dayjs } from "dayjs";
import "@/src/lib/dayjs"; // import การ config ด้านบน

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
};

export default function CustomDatePicker({ label, value, onChange }: Props) {
  return (
    // ห่อด้วย LocalizationProvider (สำคัญสำหรับ locale & format)
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
      <DatePicker
        label={label}
        value={value}
        format="DD MMMM YYYY"
        onChange={onChange}
        slots={{
          openPickerIcon: CalendarTodayIcon,
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            sx: {
              // Root ของ input picker
              "& .MuiPickersInputBase-root": {
                // หรือ .MuiPickersOutlinedInput-root ถ้าเวอร์ชันของคุณมี
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#2c2f33" : "#E8E8E8", // ตาม theme คุณ
                borderRadius: "10px",
                height: "49px",

                // Target notchedOutline โดยตรง (ขอบจริง ๆ)
                "& .MuiPickersOutlinedInput-notchedOutline": {
                  borderColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.23)" // สีขอบ dark mode (เทาอ่อน)
                      : "rgba(0, 0, 0, 0.23)", // สีขอบ light mode (เทาเข้ม default MUI)
                  borderRadius: "10px",

                  // Optional: เพิ่ม borderWidth ถ้าต้องการหนาขึ้น
                  borderWidth: "1px",
                },

                // Hover state (ตามธีม)
                "&:hover .MuiPickersOutlinedInput-notchedOutline": {
                  borderColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.5)" // hover สว่างขึ้นใน dark
                      : "rgba(0, 0, 0, 0.5)", // hover เข้มขึ้นใน light
                  borderRadius: "10px",
                },

                // Focus state (ใช้ primary color จาก theme เพื่อสวยและ consistent)
                "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                  borderColor: (theme) => theme.palette.primary.main,
                  borderWidth: "2px", // หนาขึ้นตอน focus เหมือน MUI default
                },
              },

              // ปรับ label ให้ตามธีม (optional แต่แนะนำ)
              "& .MuiInputLabel-root": {
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#aaa" : "#2c2f33",
                "&.Mui-focused": {
                  color: (theme) => theme.palette.primary.main,
                },
              },

              // Icon ปฏิทิน (optional)
              "& .MuiInputAdornment-root .MuiIconButton-root": {
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#fff" : "#2c2f33",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
