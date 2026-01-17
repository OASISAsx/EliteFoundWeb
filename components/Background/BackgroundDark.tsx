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
      <div
        className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse
        ${resolvedTheme === "dark" ? "bg-blue-600/20" : "bg-sky-300/40"}`}
      />

      <div
        className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse
        ${resolvedTheme === "dark" ? "bg-purple-600/20" : "bg-pink-300/40"}`}
      />
    </div>
  );
}
