"use client";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const showcases = [
  { image: "/stocks/eimsLogin.png" },
  { image: "/stocks/stockfix03.png" },
  { image: "/stocks/stock21.png" },
  { image: "/stocks/scanPo.png" },
  { image: "/stocks/stockfix1.png" },
];

export default function UIShowcase() {
  const t = useTranslations("carousels.stock");
  const [index, setIndex] = useState(0);
  const current = showcases[index];
  const [openImage, setOpenImage] = useState<string | null>(null);
  const images = showcases.map((item) => item.image);
  return (
    <Box
      key={`stock-${index}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        py: 6,
      }}
    >
      <div className="flex flex-col items-center justify-end">
        <motion.h2
          key={`heading-${index}`}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-white px-3 line-clamp-1"
        >
          {t("heading")}
        </motion.h2>

        <p className="mt-2 max-w-xl text-white/60 px-4 line-clamp-1">
          {t("subtitle")}
        </p>
      </div>

      <div className="w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* TEXT */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-xl min-h-[260px] bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg mx-auto flex flex-col justify-between"
            >
              <motion.h6
                key={`title-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold text-gray-400"
              >
                {t(`${index}.title`)}
              </motion.h6>

              <motion.p
                key={`desc-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mt-4 text-white/60 leading-relaxed"
              >
                {t(`${index}.description`)}
              </motion.p>

              {/* CONTROLS */}
              <Box className="mt-10 flex w-full items-center justify-between">
                <div className="flex gap-3">
                  {showcases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setIndex(
                        (prev) =>
                          (prev - 1 + showcases.length) % showcases.length,
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Previous image"
                  >
                    ←
                  </button>

                  <button
                    onClick={() =>
                      setIndex((prev) => (prev + 1) % showcases.length)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Next image"
                  >
                    →
                  </button>
                </div>
              </Box>
            </motion.div>
          </div>

          {/* IMAGE */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[34/22] overflow-hidden rounded-2xl bg-white/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={t(`${index}.title`)}
                  onClick={() => setOpenImage(current.image)}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </AnimatePresence>
              <AnimatePresence>
                {openImage && (
                  <motion.div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpenImage(null)}
                  >
                    <motion.img
                      key={current.image}
                      src={current.image}
                      className="max-w-[90%] max-h-[90%] object-contain rounded-xl cursor-pointer"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1,
                        );
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}


