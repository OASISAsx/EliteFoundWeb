"use client";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const showcases = [
  {
    title: "Detail Product",
    description:
      "ตรวจสอบสินค้ารายละเอียดสินค้า ติดตามการซื้อขายจาก SerialNumber",
    image: "/stocks/stock23.png",
  },
  {
    title: "Total Sales",
    description:
      "ตรวจสอบยอดขายสินค้าในแต่ละเดือนเพื่อ ทำเพิ่มการซื้อสินค้าที่ขายดี",
    image: "/stocks/stock21.png",
  },
  {
    title: "Purchase Order",
    description: "รับสินค้าด้วย SerialNumber ของแต่ละสินค้าเพื่อเก็บไว้ในระบบ",
    image: "/stocks/stock20.png",
  },
  {
    title: "Sales Order",
    description: "ขายสินค้า ตัดสินค้าในระบบด้วย SerialNumber",
    image: "/stocks/stock5.png",
  },
  // {
  //   title: "Settings Panel",
  //   description: "Clean and minimal settings layout focused on usability.",
  //   image: "/stocks/stock4.png",
  // },
];

export default function UIShowcase() {
  const [index, setIndex] = useState(0);
  const current = showcases[index];

  return (
    <section className="w-full max-w-9xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* TEXT */}
        <div className="lg:col-span-5">
          <motion.h2
            key={current.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-bold text-white"
          >
            {current.title}
          </motion.h2>

          <motion.p
            key={current.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-4 text-white/60 leading-relaxed"
          >
            {current.description}
          </motion.p>

          {/* CONTROLS */}
          <Box className="mt-10 flex w-full items-center justify-between">
            {/* ซ้าย : dots */}
            <div className="flex gap-3">
              {showcases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all
          ${i === index ? "w-8 bg-white" : "w-2 bg-white/30"}
        `}
                />
              ))}
            </div>

            {/* ขวา : arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setIndex(
                    (prev) => (prev - 1 + showcases.length) % showcases.length,
                  )
                }
                className="
        flex h-10 w-10 items-center justify-center
        rounded-full bg-white/10 text-white
        transition hover:bg-white/20
      "
                aria-label="Previous image"
              >
                ←
              </button>

              <button
                onClick={() =>
                  setIndex((prev) => (prev + 1) % showcases.length)
                }
                className="
        flex h-10 w-10 items-center justify-center
        rounded-full bg-white/10 text-white
        transition hover:bg-white/20
      "
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </Box>
        </div>

        {/* IMAGE */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[30/17] overflow-hidden rounded-2xl bg-white/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.title}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
