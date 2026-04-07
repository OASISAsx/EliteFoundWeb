import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
export default function WorkHistory() {
  return (
    <div>
      <div className="max-w-6xl w-full pt-10">
        <h3 className=" text-white text-3xl font-semibold p-10">
          Work History
        </h3>
        <div className="relative grid md:grid-cols-2 gap-12 sx:gap-8 px-6">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-white/20" />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-white text-xl font-semibold ">
                Full-Stack Developer
              </h3>
              <div className="bg-white h-[45px] w-[160px] rounded-md flex items-center justify-center mb-2">
                <Image
                  src="/images/poon_logo.png"
                  alt="Company logo"
                  width={160}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-3">
              2024 May – Present (Poontana Marketing Co., Ltd)
            </p>
            <p className="text-gray-300 leading-relaxed">
              ออกแบบและพัฒนา ERP Web Application ที่รองรับการขยายตัวของระบบ
              (Scalable Architecture) ครอบคลุมทั้ง Frontend และ Backend
              โดยพัฒนาโมดูลหลักของระบบ ได้แก่ Stock, Sales, Purchasing,
              Quotation และ Reporting ออกแบบระบบ Customer Visit Planning, Site
              Survey และ Job Scheduling สำหรับงานติดตั้งและบำรุงรักษา พร้อมพัฒนา
              Barcode Scanning System
              เพื่อเพิ่มความรวดเร็วและความแม่นยำในการจัดการสินค้า ออกแบบและพัฒนา
              Financial Calculation System เพื่อรองรับกระบวนการทางธุรกิจด้าน
              Marketing และการคำนวณทางการเงินที่ซับซ้อน พัฒนา Real-time System
              ด้วย WebSocket (Socket.IO) สำหรับระบบ Messaging
              เพื่อให้ลูกค้าสามารถติดต่อทีม Admin ได้แบบทันที และพัฒนา Scan
              Login ผ่าน QR Code บนหน้าจอ Kiosk
              สำหรับการลงเวลาทำงานและอัปเดตข้อมูลแบบเรียลไทม์ ออกแบบและติดตั้ง
              CI/CD Pipeline โดยมีการทดสอบระบบ (Testing) ก่อนทำการ Deploy
              แบบอัตโนมัติไปยัง Production บริหารจัดการระบบด้วย Kubernetes (K8s)
              เพื่อรองรับการทำงานแบบ Containerized Architecture
              ช่วยให้ระบบสามารถ Scale ได้อัตโนมัติ (Auto-scaling),
              เพิ่มความเสถียร (High Availability) และรองรับการ Deploy แบบ
              Rolling Update / Blue-Green Deployment
              เพื่อให้การอัปเดตระบบเป็นไปอย่างราบรื่นและไม่มี Downtime
              {/* ทำงานในตำแหน่ง Full-Stack Developer ออกแบบและพัฒนาเว็บแอปพลิเคชัน
              ERP ที่สามารถรองรับการขยายตัวของระบบ (Scalable)
              โดยใช้เทคโนโลยีฝั่ง Frontend และ Backend สมัยใหม่ พัฒนาระบบ ERP
              ที่มีโมดูลหลัก เช่น คลังสินค้า (Stock), การขาย (Sales), การจัดซื้อ
              (Purchasing), ใบเสนอราคา (Quotation) และรายงาน (Reporting)
              รวมถึงระบบสำหรับ การวางแผนการเข้าพบลูกค้า, การจัดการ Site Survey
              และการจัดตารางงานติดตั้ง/บำรุงรักษา พัฒนาฟีเจอร์ Barcode Scanning
              และระบบคำนวณทางการเงิน พร้อมทั้งนำหลักการ FIFO (First-In,
              First-Out) มาใช้ในการจัดการการขาย
              เพื่อให้ลูกค้าได้รับสินค้าล็อตใหม่ล่าสุด สร้างระบบ
              รายงานอัตโนมัติในรูปแบบ PDF และระบบ Workflow
              เพื่อเพิ่มประสิทธิภาพในการทำงานขององค์กร */}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-white text-xl font-semibold">
                Internship Developer
              </h3>

              <Image
                className="items-center justify-center mb-2 rounded-md "
                alt=""
                src={"../images/dexon.jpg"}
                width={160}
                height={50}
              />
            </div>
            <p className="text-gray-400 text-sm mb-3 mt-10">
              Nov 2023 - Feb 2024 (Dexon technologies Co., Ltd)
            </p>
            <p className="text-gray-300 leading-relaxed">
              พัฒนาเว็บแอปพลิเคชัน โดยเน้นแนวทาง Software Engineering
              อย่างเป็นระบบ มีบทบาทในการออกแบบโครงสร้างข้อมูล (Data Structure)
              และสถาปัตยกรรมระบบ
              เพื่อรองรับการทำงานที่มีประสิทธิภาพและขยายต่อได้ในอนาคต
              แก้ไขและปรับปรุงปัญหาในฝั่ง Frontend พร้อมเพิ่มประสิทธิภาพด้าน
              Optimization และ Performance ให้ระบบโหลดเร็วและตอบสนองดี
              มีส่วนร่วมในการออกแบบ UX/UI
              และโครงสร้างระบบให้สอดคล้องกับการใช้งานจริง รวมถึงออกแบบ Branding
              เช่น โลโก้และงานกราฟิกด้วย Adobe Photoshop
              เพื่อเสริมภาพลักษณ์ของโปรดักต์ นอกจากนี้ยังพัฒนา Custom PDF
              Template สำหรับเอกสารภายในระบบ
              โดยออกแบบให้รองรับโครงสร้างข้อมูลจริงและใช้งานได้อย่างมืออาชีพ
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
