"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BackgroundTheme() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {resolvedTheme === "light" && (
        <div className=" fixed inset-0 -z-10 bg-gray-200">
          <div className="absolute top-[-15%] left-[-15%] w-[45%] h-[45%] rounded-full blur-[160px] bg-sky-900/60" />
          <div className="absolute bottom-[-15%] right-[-15%] w-[45%] h-[45%] rounded-full blur-[160px] bg-indigo-800/5" />
        </div>
      )}

      {resolvedTheme === "dark" && (
        <div className=" bg-[#020617]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-blue-600/20 animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[160px] bg-purple-600/20 animate-pulse" />
        </div>
      )}

      {/* <div
        className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse
        ${resolvedTheme === "dark" ? "bg-blue-600/20" : "bg-sky-300/40 "}`}
      />

      <div
        className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse
        ${resolvedTheme === "dark" ? "bg-purple-600/20" : "bg-pink-300/40"}`}
      /> */}
    </div>
  );
}
