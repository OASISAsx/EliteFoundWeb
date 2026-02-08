"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Project } from "./data";
import { Box } from "@mui/material";

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
    aspect-[4/3]          /* mobile เตี้ยลง */
    sm:aspect-[4/3]
    lg:aspect-[4/3]      /* desktop cinematic */
  "
    >
      <motion.div
        layoutId={project.id}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="
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
          sizes="
        (max-width: 240px) 100vw,
        (max-width: 1024px) 50vw,
        25vw
      "
          className="object-cover"
        />
      </motion.div>
    </Box>
  );
}
