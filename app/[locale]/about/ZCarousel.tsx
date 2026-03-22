"use client";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const showcases = [
  {
    title: "Login Page",
    description:
      "Login Page เป็นจุดเริ่มต้นของการเข้าใช้งานระบบ Zillion ERP ทำหน้าที่ควบคุมการเข้าถึงระบบของผู้ใช้งานแต่ละคน โดยผู้ใช้จะต้องยืนยันตัวตนผ่านข้อมูลที่ได้รับอนุญาต เช่น ชื่อผู้ใช้และรหัสผ่าน ระบบสามารถกำหนดสิทธิ์การเข้าถึงตามบทบาท (Role) เพื่อให้ผู้ใช้งานสามารถเข้าถึงเฉพาะฟังก์ชันที่เกี่ยวข้องกับหน้าที่ของตนเอง ช่วยเพิ่มความปลอดภัยของข้อมูลและความเป็นระเบียบในการบริหารระบบภายในองค์กร",
    image: "/zillion/8.png",
  },
  {
    title: "Total Projects",
    description:
      "การสร้างและบริหารโครงการเพื่อจัดเก็บเอกสารภายในองค์กร Total Projects เป็นโมดูลสำหรับสร้างและจัดการโครงการต่าง ๆ ภายในองค์กร โดยใช้เป็นศูนย์กลางในการรวบรวมเอกสาร ข้อมูล และกิจกรรมที่เกี่ยวข้องกับการบริหารงานแต่ละโครงการ ผู้ใช้งานสามารถสร้างโครงการใหม่ กำหนดรายละเอียดโครงการ และจัดเก็บเอกสารที่เกี่ยวข้องได้อย่างเป็นระบบ ช่วยให้การติดตามความคืบหน้าและการค้นหาข้อมูลโครงการทำได้สะดวกและมีประสิทธิภาพมากขึ้น",
    image: "/zillion/7.png",
  },
  {
    title: "Quotation",
    description:
      "ระบบสร้างใบเสนอราคาและติดตามสถานะการอนุมัติ Quotation เป็นระบบสำหรับสร้างใบเสนอราคาให้กับลูกค้า โดยสามารถดึงข้อมูลที่เกี่ยวข้องมาจากโครงการที่มีอยู่ในระบบ เช่น ข้อมูลลูกค้า รายละเอียดงาน และเงื่อนไขต่าง ๆ ระบบยังรองรับการติดตามสถานะของใบเสนอราคา ตั้งแต่ขั้นตอนการสร้าง การส่งให้ลูกค้า ไปจนถึงการอนุมัติหรือปฏิเสธ ช่วยให้กระบวนการเสนอราคามีความชัดเจน โปร่งใส และลดความผิดพลาดในการทำงาน",
    image: "/zillion/6.png",
  },
  {
    title: "Quotation Details",
    description:
      "การจัดการรายละเอียดใบเสนอราคาจากข้อมูลสินค้า Master Quotation Details เป็นส่วนที่ใช้จัดการรายละเอียดเชิงลึกของใบเสนอราคา โดยดึงข้อมูลสินค้าจากระบบ Master Data มาใช้งานโดยตรง เช่น ชื่อสินค้า ราคา และรายละเอียดสินค้า การใช้ข้อมูลจาก Master ช่วยลดความซ้ำซ้อนและความคลาดเคลื่อนของข้อมูล ทำให้ใบเสนอราคามีความถูกต้องและเป็นมาตรฐานเดียวกันทั้งระบบ",
    image: "/zillion/5.png",
  },
  {
    title: "Sales Attendance",
    description:
      "ระบบติดตามการเข้า–ออกงานของพนักงานขาย Sales Attendance เป็นโมดูลที่ใช้สำหรับบันทึกและติดตามสถานะการเข้า–ออกงานของพนักงานขาย ระบบช่วยให้ผู้บริหารสามารถตรวจสอบเวลาการทำงาน การลงพื้นที่ หรือสถานะการปฏิบัติงานของทีมขายได้อย่างชัดเจน ข้อมูลที่ได้สามารถนำไปใช้ในการประเมินประสิทธิภาพการทำงาน วางแผนงานขาย และบริหารทรัพยากรบุคคลได้อย่างเหมาะสม",
    image: "/zillion/4.png",
  },
  {
    title: "Installation",
    description:
      "การจัดการงานติดตั้งสินค้าและบันทึกข้อมูลหน้างาน Installation เป็นระบบที่ใช้บริหารจัดการงานติดตั้งสินค้าให้กับลูกค้า ตั้งแต่การวางแผนงานติดตั้ง การมอบหมายทีมงาน ไปจนถึงการบันทึกข้อมูลหน้างานจริง เช่น รายละเอียดการติดตั้ง สถานะงาน และภาพประกอบ ระบบช่วยให้การติดตั้งสินค้าเป็นไปอย่างเป็นขั้นตอน สามารถติดตามความคืบหน้าได้แบบเรียลไทม์ และรองรับการตรวจสอบหรืออ้างอิงข้อมูลในภายหลัง",
    image: "/zillion/3.png",
  },
  {
    title: "Manage Menu",
    description:
      "Manage Menu เป็นโมดูลสำหรับจัดการเมนูการใช้งานภายในระบบ โดยกำหนดให้ผู้ใช้งานสามารถเห็นและเข้าถึงเฉพาะเมนูที่เกี่ยวข้องกับแผนกหรือหน้าที่ที่ตนเองรับผิดชอบเท่านั้น ระบบจะเชื่อมโยงเมนูกับสิทธิ์การใช้งาน (Role / Department) เพื่อควบคุมการแสดงผลเมนูอย่างเป็นระบบ ลดความซับซ้อนในการใช้งาน และป้องกันการเข้าถึงข้อมูลหรือฟังก์ชันที่ไม่เกี่ยวข้อง ",
    image: "/zillion/2.png",
  },
  // {
  //   title: "Approve",
  //   description:
  //     "ระบบอนุมัติรายการผ่านการตรวจสอบจาก Menager Approve เป็นระบบสำหรับจัดการกระบวนการอนุมัติเอกสารหรือรายการต่าง ๆ ภายในองค์กร โดยรายการที่จะเข้าสู่ขั้นตอนการอนุมัติจะต้องผ่านการตรวจสอบความถูกต้องจากหัวหน้าหรือผู้รับผิดชอบในขั้นต้นก่อน เมื่อข้อมูลถูกตรวจสอบและยืนยันความถูกต้องเรียบร้อยแล้ว ระบบจึงจะส่งต่อให้ผู้มีอำนาจอนุมัติทำการพิจารณา ",
  //   image: "/zillion/1.png",
  // },
  // {
  //   title: "Settings Panel",
  //   description: "Clean and minimal settings layout focused on usability.",
  //   image: "/stocks/stock4.png",
  // },
];

export default function UIShowcaseZ() {
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
