"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Project } from "./data";
import { Button, Chip } from "@mui/material";

export default function PortfolioDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="
      mx-auto max-w-7xl
      grid grid-cols-1 lg:grid-cols-2
      py-10 sm:py-4 md:py-12
      gap-10
      items-center
    "
      >
        {/* LEFT IMAGE */}
        <motion.div
          layoutId={project.id}
          className="
    relative
    mx-auto
    w-full
    aspect-[8/5]          
    overflow-hidden
    rounded-2xl
  "
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="
      (max-width: 640px) 90vw,
      (max-width: 1024px) 70vw,
      50vw
    "
            className="object-cover"
          />
        </motion.div>

        {/* RIGHT DETAIL */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
          flex
          flex-col
          justify-center
          text-white
          px-2
          lg:px-6
        "
        >
          <h1 className="text-3xl lg:text-4xl font-bold">{project.title}</h1>

          <p className="mt-4 text-zinc-400 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t: string) => (
              <Chip color="info" key={t} label={t} />
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            {/* <Button variant="contained">Live</Button>
          <Button variant="outlined">GitHub</Button> */}
            <Button variant="outlined" color="error" onClick={onClose}>
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
