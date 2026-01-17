"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggleClient from "@/components/defaultTheme/theme-toggle-client";
import { signOut } from "next-auth/react";
import { useUserStore } from "@/stores/user.store";
// import { useUserStore } from "@/stores/user.store";
export default function Navbar() {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    useUserStore.getState().logout();
    window.location.href = "/login";
  };

  return (
    <nav
      className="
  fixed top-0 left-0 w-full z-50
  backdrop-blur-md

  border-b border-gray-200 dark:border-white/10
  shadow-sm
"
    >
      {/* <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" /> */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src=".\images\logoEF.png" // ใส่โลโก้คุณ
            alt="Logo"
            width={70}
            height={90}
            className="rounded-lg"
          />
          {/* <span className="font-bold text-lg text-gray-900 dark:text-white">
            EliteFund
          </span> */}
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-blue-500 transition">
            Home
          </Link>
          <Link href="/personalized" className="hover:text-blue-500 transition">
            Personalized
          </Link>
          <Link href="/services" className="hover:text-blue-500 transition">
            Services
          </Link>
          <Link href="/contact" className="hover:text-blue-500 transition">
            Contact
          </Link>
          <Link
            href="/login"
            onClick={() => {
              handleLogout();
            }}
            className="hover:text-blue-500 transition"
          >
            Logout
          </Link>
        </div>

        {/* RIGHT ACTION */}
        <div className="flex items-center gap-4">
          <ThemeToggleClient />
        </div>
      </div>
    </nav>
  );
}
