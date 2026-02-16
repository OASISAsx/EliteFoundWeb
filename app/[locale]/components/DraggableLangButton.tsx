"use client";

import { useState, useRef, useEffect } from "react";
import { IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { usePathname, useRouter } from "next/navigation";
import { Translate } from "@mui/icons-material";

export default function DraggableLangButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleChangeLang = () => {
    if (pathname.startsWith("/th")) {
      router.push(pathname.replace("/th", "/en"));
    } else {
      router.push(pathname.replace("/en", "/th"));
    }
  };

  return (
    <IconButton
      onMouseDown={handleMouseDown}
      onClick={handleChangeLang}
      sx={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: "primary.main",
        color: "#fff",
        boxShadow: 3,
        "&:hover": {
          backgroundColor: "primary.dark",
        },
        zIndex: 9999,
      }}
    >
      <Translate />
    </IconButton>
  );
}
