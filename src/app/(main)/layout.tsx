"use client";

import Navbar from "@/src/components/Navbar/Navbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Anuphan } from "next/font/google";
import "@/src/lib/dayjs";
import Sidebar from "@/src/components/SideBar";

const anuphan = Anuphan({
  subsets: ["thai"],
  weight: ["400"],
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-background ${anuphan.className}`}>
      <Navbar />
      {/* <Sidebar /> */}
      <main className="pt-16">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
          {children}
        </LocalizationProvider>
      </main>
    </div>
  );
}
