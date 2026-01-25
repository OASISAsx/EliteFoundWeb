"use client";

import Navbar from "@/src/components/Navbar/Navbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Anuphan } from "next/font/google";
import "@/src/lib/dayjs";
import Sidebar from "@/src/components/SideBar";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const anuphan = Anuphan({
  subsets: ["thai"],
  weight: ["400"],
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const roles = session?.user?.userRoles?.map((ur: any) => ur.role.name) || [];
  const isPDFPage = pathname.includes("/pdf");
  return (
    <div className={`min-h-screen bg-background ${anuphan.className}`}>
      {roles.includes("USER") && <Navbar />}

      <div className="flex pt-16 h-[calc(100vh-4rem)] overflow-hidden">
        {isPDFPage || (roles.includes("ADMIN") && <Sidebar />)}

        <main className="flex-1 p-4 overflow-y-auto">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
            {children}
          </LocalizationProvider>
        </main>
      </div>
    </div>
  );
}
