"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!mounted) setMounted(true);
  }, [mounted]);

  const current = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="
        relative flex items-center gap-2
        px-4 py-2 rounded-full
        bg-gray-200 dark:bg-gray-800
        text-black dark:text-white
        transition-all duration-500
        hover:scale-110 active:scale-95
        shadow-md dark:shadow-blue-500/30
      "
    >
      <span
        className={`text-xl transition-transform duration-700 ${
          current === "dark" ? "rotate-180" : "rotate-0"
        }`}
      >
        {current === "dark" ? "🌙" : "☀️"}
      </span>

      <span className="font-medium">
        {current === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}
