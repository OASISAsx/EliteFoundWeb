"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiCacheProvider from "@/app/mui-cache-provider";
import {
  lightMuiTheme,
  darkMuiTheme,
} from "@/components/defaultTheme/mui-theme";
import { useTheme } from "next-themes";
import BackgroundDark from "@/components/Background/BackgroundDark";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { Anuphan } from "next/font/google";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/th"; // ← สำคัญมาก! ทำให้เดือน/วันเป็นไทย

// Plugin พิเศษสำหรับปี พ.ศ. (ถ้าต้องการแสดง พ.ศ. แทน ค.ศ.)
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra); // เปิดใช้งาน plugin

// ตั้งค่า locale ไทยทั่วทั้งแอพ (เดือน วัน เป็นไทยอัตโนมัติ)
dayjs.locale("th");
const anuphan = Anuphan({
  subsets: ["thai"],
  weight: ["400"],
});
function MuiThemeSync({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const theme = resolvedTheme === "dark" ? darkMuiTheme : lightMuiTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default function Providers({ children, session }: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
      <SessionProvider session={session}>
        <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MuiCacheProvider>
            <MuiThemeSync>
              <BackgroundDark />
              {children}
            </MuiThemeSync>
          </MuiCacheProvider>
        </NextThemeProvider>
      </SessionProvider>
    </LocalizationProvider>
  );
}
