"use client";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
const showcases = [
  {
    title: "Login Page",
    description:
      "Login Page เป็นจุดเริ่มต้นของการเข้าใช้งานระบบ Eims โดยจะส่งข้อมูล Username และ Password เข้าไปตรวจสอบการ Login มีอยู่ในระบบหรือไม่ ถ้ามี username จะทำการ เช็คจาก password hash กลับเอาไปเช็ค database",
    image: "/stocks/loginEwork.png",
  },
  {
    title: "Detail Product",
    description:
      "หน้าระบบที่ใช้แสดงข้อมูลรายละเอียดของสินค้าในระดับเชิงลึก ไม่ใช่เพียงข้อมูลทั่วไปของรุ่นสินค้า แต่รวมถึงข้อมูลเฉพาะของสินค้าแต่ละชิ้นที่ถูกระบุด้วย Serial Number ซึ่งทำให้สามารถติดตามประวัติของสินค้าตั้งแต่ต้นทางจนถึงปลายทางได้อย่างครบถ้วน ระบบนี้ช่วยเปลี่ยนมุมมองการจัดการสินค้า จากการมองเป็น “สินค้าในภาพรวม” ไปสู่การมองเป็น “สินค้าแต่ละชิ้น” ซึ่งมีตัวตนและประวัติที่ตรวจสอบได้",
    image: "/stocks/stockfix03.png",
  },
  {
    title: "Total Sales",
    description:
      "สรุปและแสดงผลยอดขายสินค้าทั้งหมดในช่วงเวลาที่กำหนด โดยมักจะแสดงผลในรูปแบบรายเดือน เพื่อให้สามารถเปรียบเทียบแนวโน้มของยอดขายในแต่ละช่วงเวลาได้อย่างชัดเจน ข้อมูลนี้ไม่เพียงแสดงยอดขายรวมเท่านั้น แต่ยังสามารถแยกดูรายละเอียดตามประเภทสินค้า รุ่นสินค้า หรือช่องทางการขายได้อีกด้วย ระบบ Total Sales ช่วยเปลี่ยนข้อมูลการขายที่กระจัดกระจายให้กลายเป็นข้อมูลเชิงวิเคราะห์ที่เข้าใจง่าย และพร้อมนำไปใช้ในการตัดสินใจทางธุรกิจ",
    image: "/stocks/stock21.png",
  },
  {
    title: "Purchase Order",
    description:
      "Purchase Order คือเอกสารและกระบวนการที่ใช้ในการสั่งซื้อสินค้า จากผู้ขายหรือซัพพลายเออร์ โดยระบุรายละเอียดของสินค้าที่ต้องการซื้อ เช่น ประเภทสินค้า จำนวน ราคา และเงื่อนไขการจัดส่ง เมื่อมีการจัดส่งสินค้า ระบบจะใช้ข้อมูลจาก Purchase Order เป็นตัวอ้างอิงในการตรวจรับสินค้า เพื่อให้มั่นใจว่าสินค้าที่ได้รับตรงตามที่สั่งซื้อไว้ ระบบ Purchase Order ช่วยสร้างความชัดเจนระหว่างฝ่ายจัดซื้อ ฝ่ายคลังสินค้า และฝ่ายบัญชี ทำให้ทุกฝ่ายสามารถทำงานบนข้อมูลเดียวกันได้อย่างถูกต้อง",
    image: "/stocks/scanPo.png",
  },
  {
    title: "Sales Order",
    description:
      "ในระบบที่มีการติดตามสินค้าแบบรายชิ้น สินค้าทุกชิ้นจะถูกระบุด้วย Serial Number เมื่อมีการขายสินค้า ระบบจะบังคับให้เลือก Serial Number ของสินค้าที่จะขาย เพื่อให้มั่นใจว่าสินค้าที่ถูกขายมีตัวตนอยู่จริงในคลัง และยังไม่เคยถูกขายออกไปก่อนหน้านี้ การขายด้วย Serial Number ช่วยลดความผิดพลาดจากการขายสินค้าซ้ำ การขายสินค้าที่ไม่มีในสต็อก หรือการระบุสินค้าผิดชิ้น และยังช่วยเชื่อมโยงข้อมูลการขายเข้ากับประวัติของสินค้าแต่ละชิ้นโดยอัตโนมัติ",
    image: "/stocks/stockfix1.png",
  },
];

export default function UIShowcase() {
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
          Poontana ERP
        </motion.h2>

        <p className="mt-2 max-w-xl text-white/60 px-4 line-clamp-1">
          Full-Stack Developer
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
