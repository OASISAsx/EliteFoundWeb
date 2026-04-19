"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const images = [
  "../works/work1.jpg",
  "../works/work2.jpg",
  "../works/work3.jpg",
  "../works/work4.jpg",
  "../works/work1.jpg",
  "../works/work2.jpg",
  "../works/work3.jpg",
  "../works/work4.jpg",
  "../works/work1.jpg",
  "../works/work2.jpg",
  "../works/work3.jpg",
  "../works/work4.jpg",
  "../works/work1.jpg",
  "../works/work2.jpg",
  "../works/work3.jpg",
  "../works/work4.jpg",
];

export default function WorkCarousel() {
  const t = useTranslations("carousels.work");
  const baseX = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const children = contentRef.current.children;
    const half = children.length / 2;

    let width = 0;
    for (let i = 0; i < half; i++) {
      width += (children[i] as HTMLElement).offsetWidth;
    }

    // gap-6 = 24px
    width += (half - 1) * 24;

    setLoopWidth(width);
  }, []);

  const speed = 200; // px / sec

  useAnimationFrame((_, delta) => {
    if (!loopWidth) return;

    let x = baseX.get() - (speed * delta) / 1000;

    while (x <= -loopWidth) {
      x += loopWidth;
    }

    baseX.set(x);
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      {/* HEADER */}
      <div className="py-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          {t("heading")}
        </motion.h2>

        <p className="mt-3 max-w-xl text-white/60">{t("subtitle")}</p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center justify-center">
        {/* CAROUSEL */}
        <div className="lg:col-span-7 overflow-hidden">
          <motion.div
            ref={contentRef}
            style={{ x: baseX }}
            className="flex gap-6 will-change-transform transform-gpu"
          >
            {[...images, ...images].map((src, index) => (
              <div
                key={index}
                className="min-w-[320px] md:min-w-[320px] h-[360px] rounded-2xl overflow-hidden
                       bg-white/5 border border-white/10"
              >
                <img
                  src={src}
                  alt={`work-${index}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* DESCRIPTION */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            {t("descriptionTitle")}
          </h3>

          <p className="text-white/60 leading-relaxed">{t("description")}</p>

          <button
            onClick={() =>
              window.open(
                "https://mydexxonwave.my.canva.site/",
                "_blank",
                "noopener,noreferrer",
              )
            }
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium
                   text-white border border-white/20 px-5 py-2.5 rounded-full
                   hover:bg-white hover:text-black transition"
          >
            {t("viewProject")}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
