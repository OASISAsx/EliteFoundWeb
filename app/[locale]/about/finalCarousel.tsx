"use client";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
const showcases = [
  {
    title: "ระบบซื้อขายของสะสมออนไลน์",
    description:
      "🛒 ระบบซื้อขายของสะสมออนไลน์ (Online Collectibles Marketplace) ระบบซื้อขายของสะสมออนไลน์ถูกพัฒนาขึ้นเพื่อเป็นแพลตฟอร์มกลางสำหรับผู้ใช้งานในการซื้อ–ขายสินค้าประเภทของสะสม เช่น ฟิกเกอร์ การ์ด โมเดล หรือสินค้าหายาก โดยมุ่งเน้นให้ผู้ใช้งานสามารถทำธุรกรรมได้อย่างสะดวก ปลอดภัย และตรวจสอบได้ในทุกขั้นตอนเป็นระบบที่สร้างขึ้นโดยใช้วัตถุประสงค์ในการทำโปรเจ็คจบการศึกษา",
    image: "/finalProject/final1.png",
  },
  {
    title: "Detail Product",
    description:
      "ผู้ใช้งานสามารถเข้าชมรายการสินค้าทั้งหมด พร้อมดูรายละเอียดสินค้า เช่น: •	รูปภาพสินค้า •	ราคา •	รายละเอียดสินค้า •	สถานะสินค้า (พร้อมขาย / SOLD OUT)",
    image: "/finalProject/final2.png",
  },
  {
    title: "Payment",
    description:
      "ก่อนตัดสินใจซื้อ ผู้ใช้งานสามารถดูข้อมูลเชิงลึกของสินค้า รวมถึงรีวิวจากผู้ซื้อรายอื่น เพื่อช่วยในการตัดสินใจ",
    image: "/finalProject/final3.png",
  },
  {
    title: "Payment Success",
    description:
      "เมื่อผู้ใช้งานเลือกสินค้า ระบบจะนำเข้าสู่ขั้นตอนการชำระเงิน โดยรองรับ: •	การอัปโหลดสลิปการโอนเงิน •	การตรวจสอบหลักฐานการชำระเงิน (Check Slip)",
    image: "/finalProject/final4.png",
  },
  {
    title: "History Purchase",
    description:
      "ผู้ใช้งานสามารถตรวจสอบประวัติการสั่งซื้อย้อนหลังได้ รวมถึงสถานะของแต่ละรายการ",
    image: "/finalProject/final5.png",
  },
  {
    title: "Review",
    description:
      "หลังจากได้รับสินค้า ผู้ซื้อสามารถให้คะแนนและเขียนรีวิวสินค้า เพื่อเพิ่มความน่าเชื่อถือให้กับผู้ขาย",
    image: "/finalProject/final7.png",
  },
  {
    title: "Product SOLD OUT",
    description:
      "ระบบสามารถจัดการสถานะสินค้า เช่น: •	สินค้าหมด (SOLD OUT) •	ปิดการขาย",
    image: "/finalProject/final8.png",
  },
  {
    title: "Register Seller",
    description:
      "ผู้ใช้งานสามารถสมัครเป็นผู้ขาย และใช้งานฟีเจอร์ •	ลงขายสินค้า (Post Product) •	จัดการรายการสินค้า •	ตรวจสอบคำสั่งซื้อ ",
    image: "/finalProject/final9.png",
  },
  {
    title: "Check Slip",
   description:
  "ระบบตรวจสอบหลักฐานการชำระเงิน โดยผู้ซื้อสามารถอัปโหลดสลิปการโอนเงินเข้าสู่ระบบ และผู้ขายหรือแอดมินสามารถตรวจสอบความถูกต้องของรายการชำระเงิน เพื่อยืนยันคำสั่งซื้อก่อนดำเนินการจัดส่งสินค้า",
    image: "/finalProject/final10.png",
  },
  {
    title: "แดชบอรดยอด การขายของ seller",
    description:
  "แดชบอร์ดสำหรับผู้ขาย ใช้แสดงข้อมูลสรุปยอดขาย เช่น รายได้รวม จำนวนคำสั่งซื้อ และสถานะออเดอร์ เพื่อช่วยให้ผู้ขายสามารถวิเคราะห์และติดตามประสิทธิภาพการขายได้อย่างมีประสิทธิภาพ",
    image: "/finalProject/final11.png",
  },
  {
    title: "Post Product",
   description:
  "ระบบสำหรับผู้ขายในการเพิ่มสินค้าเข้าสู่แพลตฟอร์ม โดยสามารถกำหนดรายละเอียดสินค้า เช่น ชื่อสินค้า ราคา รูปภาพ และคำอธิบายสินค้า เพื่อเปิดขายให้ผู้ใช้งานในระบบสามารถเข้าถึงและสั่งซื้อได้",
    image: "/finalProject/final12.png",
  },
];

export default function UIShowcaseColection() {
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
          Buy and sell collectibles
        </motion.h2>

        <p className="mt-2 max-w-xl text-white/60 px-4 line-clamp-1">
          Students developing the system
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
