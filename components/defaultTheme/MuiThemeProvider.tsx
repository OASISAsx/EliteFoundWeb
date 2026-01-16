// components/MuiThemeProvider.tsx
"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Anuphan } from "next/font/google";

import {
  lightMuiTheme,
  darkMuiTheme,
} from "@/components/defaultTheme/mui-theme";
const anuphan = Anuphan({
  subsets: ["thai"],
  weight: ["400"],
});
export default function MuiThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // 🔥 ป้องกัน hydration mismatch

  const muiTheme = resolvedTheme === "dark" ? darkMuiTheme : lightMuiTheme;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={anuphan.className}>{children}</div>
    </MuiThemeProvider>
  );
}
