"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BackgroundTheme() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; // ⭐ ป้องกัน hydration mismatch

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
      <div
        className={`absolute top-[-15%] left-[-15%] w-[50%] h-[50%] rounded-full blur-[140px] animate-pulse 
        ${theme === "dark" ? "bg-blue-600/20 blur-[120px]" : "bg-sky-300/40"}`}
      />
      <div
        className={`absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] rounded-full blur-[140px] animate-pulse 
        ${
          theme === "dark" ? "bg-purple-600/20 blur-[120px]" : "bg-pink-300/40"
        }`}
      />
    </div>
  );
}
