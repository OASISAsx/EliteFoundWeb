"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children, session }: any) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
