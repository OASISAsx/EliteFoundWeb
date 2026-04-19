"use client";

import { useState } from "react";
import { Project, projects } from "./data";
import PortfolioItem from "./PortfolioItem";
import PortfolioDetail from "./PortfolioDetail";
// import { LayoutGroup } from "motion/react";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";

const projectTranslationKeys: Record<string, string> = {
  p1: "cicd",
  p2: "dataStructure",
  p3: "systemAnalyst",
  p4: "appSecurity",
};

export default function PortfolioGrid() {
  const [active, setActive] = useState<Project | null>(null);
  const t = useTranslations("projects");

  const translatedProjects = projects.map((p) => ({
    ...p,
    description: projectTranslationKeys[p.id]
      ? t(`${projectTranslationKeys[p.id]}.description`)
      : p.description,
  }));

  return (
    <Box
      className="relative"
      sx={{
        px: {
          xs: 3,
          sm: 5,
          lg: 3,
        },

        py: 6,
      }}
    >
      {!active && (
        <div className="flex min-h-[calc(100vh-160px)] items-center">
          <div
            className="
          mx-auto
          w-full
          max-w-4xl
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-2
          gap-30
        "
          >
            {translatedProjects.map((p: Project) => (
              <PortfolioItem
                key={p.id}
                project={p}
                onClick={() => setActive(p)}
              />
            ))}
          </div>
        </div>
      )}

      {active && (
        <PortfolioDetail project={active} onClose={() => setActive(null)} />
      )}
    </Box>
  );
}
