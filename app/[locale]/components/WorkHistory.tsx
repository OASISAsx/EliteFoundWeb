import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
export default function WorkHistory() {
  return (
    <div>
      {" "}
      <div className="max-w-6xl w-full">
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
              2024 – Present (Poontana Marketing Co., Ltd)
            </p>
            <p className="text-gray-300 leading-relaxed">
              ออกแบบและพัฒนา ERP Web Application ที่รองรับการขยายตัวของระบบ
              (Scalable Architecture) ครอบคลุมทั้ง Frontend และ Backend
              พัฒนาโมดูลหลักของระบบ ได้แก่ Stock, Sales, Purchasing, Quotation
              และ Reporting ออกแบบระบบ Customer Visit Planning, Site Survey และ
              Job Scheduling สำหรับงานติดตั้งและบำรุงรักษา พัฒนา Barcode
              Scanning System
              เพื่อเพิ่มความรวดเร็วและความแม่นยำในการจัดการสินค้า ออกแบบและพัฒนา
              Financial Calculation System รองรับกระบวนการทางธุรกิจ นำหลักการ
              FIFO (First-In, First-Out) มาใช้ในการจัดการสินค้า
              เพื่อให้การขายมีความถูกต้องตามลำดับล็อต สร้างระบบ Automated PDF
              Reporting ลดขั้นตอนการทำงานแบบ Manual พัฒนา Workflow System
              เพื่อเพิ่มประสิทธิภาพการทำงานภายในองค์กร ออกแบบและติดตั้ง CI/CD
              Pipeline Test ก่อนที่จะทำการ Deploy แบบอัตโนมัติ ไปที่ Production
              พัฒนา Real-time System ด้วย WebSocket (Socket.IO) ทำ Message
              เพื่อให้ลูกค้าติดต่อหา ทีม Admin คอยแก้ปัญหา และ ทำหน้า Scan Login
              เข้าหน้าผ่านทาง QR Code บนจอ kiosk สำหรับอัปเดตข้อมูลแบบทันที
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
              4 months 2023 – 2024 (Dexon technologies Co., Ltd)
            </p>
            <p className="text-gray-300 leading-relaxed">
              มีส่วนร่วมในการพัฒนาเว็บแอปพลิเคชัน
              และได้รับประสบการณ์ในการใช้งานเทคโนโลยีฝั่ง Frontend
              โดยใช้เฟรมเวิร์ก Vue.js และ Tailwind CSS
              ในการพัฒนาระบบที่เกี่ยวข้องกับงานด้าน Software Engineering
              ช่วยเสนอความคิดเห็นและออกแบบโครงสร้างข้อมูล (Data Structure)
              รวมถึงมีส่วนร่วมในการออกแบบระบบให้เหมาะสมกับการทำงานของแอปพลิเคชัน
              ออกแบบโลโก้และงานด้านกราฟิก โดยใช้โปรแกรม Adobe Photoshop
              เพื่อสนับสนุนภาพลักษณ์และเอกลักษณ์ของระบบ ออกแบบเอกสาร PDF
              สำหรับการใช้งานภายในระบบ โดยสร้าง Template เฉพาะ (Custom PDF
              Template) ให้เหมาะสมกับรูปแบบข้อมูลและการใช้งานจริง
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
