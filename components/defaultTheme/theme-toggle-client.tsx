"use client";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./theme-toggle"), {
  ssr: false,
});

export default function ThemeToggleClient() {
  return <ThemeToggle />;
}
