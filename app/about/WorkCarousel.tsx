"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

const images = [
  "./works/work1.jpg",
  "./works/work2.jpg",
  "./works/work3.jpg",
  "./works/work4.jpg",
  "./works/work1.jpg",
  "./works/work2.jpg",
  "./works/work3.jpg",
  "./works/work4.jpg",
  "./works/work1.jpg",
  "./works/work2.jpg",
  "./works/work3.jpg",
  "./works/work4.jpg",
  "./works/work1.jpg",
  "./works/work2.jpg",
  "./works/work3.jpg",
  "./works/work4.jpg",
];

export default function WorkCarousel() {
  const baseX = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState<number | null>(null);

  // วัดความกว้างจริงของ 1 loop
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const children = contentRef.current.children;
    const half = children.length / 2;

    let width = 0;
    for (let i = 0; i < half; i++) {
      width += (children[i] as HTMLElement).offsetWidth;
    }

    // gap-6 = 24px * จำนวนช่องว่าง
    width += (half - 1) * 24;

    setLoopWidth(width);
  }, []);

  const speed = 200; // px / sec

  useAnimationFrame((_, delta) => {
    if (!loopWidth) return; // ⭐ สำคัญมาก

    let x = baseX.get() - (speed * delta) / 1000;

    // loop แบบปลอดภัย (กัน frame กระโดด)
    while (x <= -loopWidth) {
      x += loopWidth;
    }

    baseX.set(x);
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      {/* HEADER */}
      <div className="py-8 ">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white "
        >
          DEXXON
        </motion.h2>

        <p className="mt-3 max-w-xl text-white/60">Internship Developer </p>
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
          // initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Description
          </h3>

          <p className="  text-white/60 leading-relaxed">
            โครงการนี้มีวัตถุประสงค์เพื่อพัฒนา software system
            ที่มีประสิทธิภาพในการสนับสนุนการทำงานของ software engineers
            ในการจัดการ industrial equipment data โดยมุ่งเน้นการติดตามและประเมิน
            service life ของระบบท่อ เช่น pipelines และ piping systems
            ภายในอุตสาหกรรม
            ระบบที่พัฒนาขึ้นจะช่วยให้ผู้ใช้งานสามารถบันทึกและบริหารจัดการข้อมูลอุปกรณ์ผ่าน
            centralized digital platform
            ซึ่งทำหน้าที่เป็นแหล่งจัดเก็บข้อมูลแบบรวมศูนย์ (centralized data
            management) เพื่อเพิ่มความถูกต้องและความสะดวกในการเข้าถึงข้อมูล
            นอกจากนี้ ระบบยังสามารถประมวลผลข้อมูลเพื่อคำนวณ critical parameters
            ที่เกี่ยวข้องกับ equipment lifespan, operating conditions,
            และปัจจัยที่ส่งผลต่อการเสื่อมสภาพของอุปกรณ์ (degradation factors)
            ซึ่งช่วยสนับสนุนการประเมินสภาพอุปกรณ์อย่างเป็นระบบและมีความน่าเชื่อถือ
            ในการใช้งานจริง วิเคราะห์ข้อมูลได้อย่างชัดเจน
            และนำผลลัพธ์ที่ได้ไปใช้ประกอบการตัดสินใจ (decision-making)
            ด้านการวางแผนบำรุงรักษาและการบริหารจัดการอุปกรณ์ในภาคอุตสาหกรรมอย่างมีประสิทธิภาพ
          </p>

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
            View project
          </button>
        </motion.div>
      </div>
    </div>
  );
}
