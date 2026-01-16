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
  );
}
