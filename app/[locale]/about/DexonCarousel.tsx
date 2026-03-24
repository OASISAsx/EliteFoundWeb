"use client";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
const showcases = [
  {
    title: "PTT Project",
    description:
      "พัฒนาระบบ software engineer เพื่อให้มีประสิทธิภาพในการทำงาน โดยทำระบบใช้งานในการเก็บข้อมูลของอุปกรณ์ที่ใช้ อยู่ในอุตสหกรรม เพื่อเช็คอายุใช้งานของท่อ ได้แก่ pipeline, piping ซึ่งจะได้รับประโยชน์จากการบันทึกข้อมูลอุปกรณ์ลงในระบบเพื่อ คำนวณหาค่าต่างๆ ในครั้งต่อไประบบจะทำการแสดงข้อมูลของอุปกรณ์ในรูปแบบต่างๆเช่น Summery Dashboard, Summery Table และยังมีการแจ้งเตือนในรูปแบบ Email ตามเงื่อนไขที่กำหนดระบบจึงเช็คอายุการใช้งานของอุปกรณ์นั้นได้ โดยข้อมูลจะอยู่ในระบบได้นาน ซึ่งถ้าเทียบกับบันทึกลงกระดาษที่ยังดูแลรักษาสภาพได้ไม่นาน จึงเกิดระบบนี้ขึ้นมาเพื่อตอบโจทย์ ให้โรงงานอุสหกรรม มีคุณภาพ และปลอดภัย ",
    image: "/works/work4.jpg",
  },
  {
    title: "ประชุมปรับ UI ระบบใหม่",
    description:
      "ปรับ UI ให้มีความใช้ง่ายและ และทันสมัยตอบโจยท์กับทุกอุสาหกรรม",
    image: "/works/work5.jpg",
  },
  {
    title: "Final Project",
    description:
      "พัฒนาโปรเจกต์ครบวงจรตั้งแต่การออกแบบระบบ (System Design) ไปจนถึงการพัฒนาและ Deploy เพื่อรองรับการใช้งานจริง",
    image: "/works/work3.jpg",
  },
  {
    title: "Icon Design",
    description:
      "ออกแบบ Icon สำหรับใช้งานภายในระบบ โดยคำนึงถึง Branding และลิขสิทธิ์ขององค์กร",
    image: "/images/iconDexon.png",
  },
  {
    title: "Team Collaboration",
    description:
      "ทำงานร่วมกับทีมในการพัฒนาระบบ วางแผน และแก้ไขปัญหา เพื่อให้โปรเจกต์สำเร็จตามเป้าหมาย",
    image: "/images/timeDexxon.jpg",
  },
  {
    title: "Certificate",
    description:
      "ใบรับรองความสามารถและผลงานที่เกี่ยวข้องกับสายงาน Software Engineering และการพัฒนาระบบ",
    image: "/images/certificave.jpg",
  },
];

export default function UIShowcaseDexon() {
  const [index, setIndex] = useState(0);
  const current = showcases[index];
  const [openImage, setOpenImage] = useState<string | null>(null);
  const images = showcases.map((item) => item.image);
  return (
    <Box
      key={current.title}
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
          key={current.title}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-white px-3 line-clamp-1"
        >
          DEXON TECHNOLOGY PLC.
        </motion.h2>

        <p className="mt-2 max-w-xl text-white/60 px-4 line-clamp-1">
          Intern Developer
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
              className="                
              w-full
                max-w-xl       
                min-h-[260px] 
                bg-white/5
                backdrop-blur
                rounded-2xl
                p-6
                shadow-lg
                mx-auto       
                flex
                flex-col
                justify-between"
            >
              <motion.h6
                key={current.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold text-gray-400"
              >
                {current.title}
              </motion.h6>

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
                        (prev) =>
                          (prev - 1 + showcases.length) % showcases.length,
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
            </motion.div>
          </div>

          {/* IMAGE */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[34/22] overflow-hidden rounded-2xl bg-white/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  onClick={() => setOpenImage(current.image)}
                  className="absolute
                   inset-0 w-full h-full object-contain"
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

                        // 👉 ไปภาพถัดไป
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
