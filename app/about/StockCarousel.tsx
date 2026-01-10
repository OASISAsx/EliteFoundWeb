"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const showcases = [
  {
    title: "Dashboard Overview",
    description:
      "Main dashboard showing key metrics, real-time stats, and quick actions.",
    image: "/stocks/stock2.png",
  },
  {
    title: "Analytics Screen",
    description:
      "Detailed analytics view with charts, filters, and performance insights.",
    image: "/stocks/stock9.png",
  },
  {
    title: "Settings Panel",
    description: "Clean and minimal settings layout focused on usability.",
    image: "/stocks/stock4.png",
  },
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
          <div className="mt-8 flex gap-3">
            {showcases.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all
                  ${i === index ? "w-8 bg-white" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>
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
