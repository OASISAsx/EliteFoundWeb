import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
};

export default function CustomDatePicker({ label, value, onChange }: Props) {
  return (
    <DatePicker
      label={label}
      value={value}
      format="DD/MM/YYYY"
      onChange={onChange}
      slots={{
        openPickerIcon: CalendarTodayIcon,
      }}
      slotProps={{
        textField: {
          fullWidth: true,
          sx: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#222",
              paddingBottom: "20px",
              color: "#fff",
            },
          },
        },
        popper: {
          sx: {
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "red",
              paddingBottom: "20px",
            },
          },
        },
      }}
    />
  );
}
