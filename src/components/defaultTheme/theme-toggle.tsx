"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative w-20 h-10 rounded-full
        flex items-center px-1
        backdrop-blur-md
        bg-gradient-to-r from-yellow-300/40 to-orange-400/40
        dark:from-indigo-600/40 dark:to-blue-600/40
        border border-white/30 dark:border-white/10
        shadow-lg
        transition-all duration-500
        hover:scale-105 active:scale-95
      "
    >
      {/* Slider */}
      <div
        className={`
          absolute top-1 left-1 w-8 h-8 rounded-full
          flex items-center justify-center
          bg-white dark:bg-gray-900
          shadow-md
          transition-all duration-500 ease-in-out
          ${isDark ? "translate-x-10" : "translate-x-0"}
        `}
      >
        <span
          className={`text-lg transition-transform duration-500 ${
            isDark ? "rotate-180" : "rotate-0"
          }`}
        >
          {isDark ? "🌙" : "☀️"}
        </span>
      </div>
    </button>
  );
}
