"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Project } from "./data";
import { Box } from "@mui/material";
import { AdsClick } from "@mui/icons-material";

export default function PortfolioItem({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <Box
      className="
    relative
    w-full
    aspect-[4/3]
  "
    >
      <motion.div
        layoutId={project.id}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="
    group
    absolute inset-0
    cursor-pointer
    overflow-hidden
    rounded-xl
    bg-zinc-800
  "
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />

        {/* CLICK HINT (แสดงตลอด) */}
        <div
          className="
      absolute inset-0
      flex items-center justify-center
      bg-black/20
      opacity-100
      transition
      group-hover:bg-black/40
    "
        >
          <div
            className="
             absolute 
             bottom-2 right-2 

        flex items-center gap-2
        px-4 py-2
        rounded-full
        bg-black/60
        backdrop-blur
        text-white
        text-sm
        opacity-80
        group-hover:opacity-100
        group-hover:scale-105
        transition
      "
          >
            <AdsClick />
            <span className="tracking-wide">Click here</span>
          </div>
        </div>
      </motion.div>
    </Box>
  );
}
