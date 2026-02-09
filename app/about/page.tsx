"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import WorkCarousel from "./WorkCarousel";
import UIShowcase from "./StockCarousel";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";

import PortfolioGrid from "./PortfolioGrid";

export default function SlotReel() {
  const icons = [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg",
    "./images/5.jpg",
    "./images/6.jpg",
    "./images/7.jpg",
    "./images/8.jpg",
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "แพลตฟอร์มอีคอมเมิร์ซที่ทันสมัย พัฒนาด้วย Next.js, TypeScript และ Stripe",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      github: "#",
      demo: "#",
    },
    {
      id: 2,
      title: "Task Management System",
      description:
        "ระบบจัดการงานแบบ Real-time ที่ช่วยให้ทีมทำงานร่วมกันได้อย่างมีประสิทธิภาพ มีฟีเจอร์ Drag & Drop,",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "#",
      demo: "#",
    },
    {
      id: 3,
      title: "AI Chat Application",
      description:
        "แอปพลิเคชันแชทที่ใช้ AI ในการตอบคำถามและช่วยเหลือผู้ใช้ ผสานเทคโนโลยี Machine Learning และ Natural Language Processing เพื่อประสบการณ์การสนทนาที่เป็นธรรมชาติ",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      tags: ["Python", "OpenAI", "FastAPI", "React"],
      github: "#",
      demo: "#",
    },
    {
      id: 4,
      title: "Portfolio Website Builder",
      description:
        "เครื่องมือสร้างเว็บไซต์พอร์ตโฟลิโอที่ใช้งานง่าย ด้วยระบบ Drag & Drop และเทมเพลตที่สวยงามหลากหลาย ผู้ใช้สามารถสร้างเว็บไซต์ของตัวเองได้ภายในไม่กี่นาที",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      tags: ["Vue.js", "Tailwind", "Firebase", "Vite"],
      github: "#",
      demo: "#",
    },
    {
      id: 5,
      title: "Weather Forecast Dashboard",
      description:
        "แดชบอร์ดพยากรณ์อากาศที่แสดงข้อมูลสภาพอากาศแบบ Real-time พร้อมกราฟและแผนที่แบบ Interactive รองรับหลายภาษาและหลายสกุลเงิน",
      image:
        "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
      tags: ["React", "D3.js", "Weather API", "Material-UI"],
      github: "#",
      demo: "#",
    },
    {
      id: 6,
      title: "Social Media Analytics",
      description:
        "เครื่องมือวิเคราะห์โซเชียลมีเดียที่ช่วยติดตามและวิเคราะห์ประสิทธิภาพของโพสต์ มีระบบ Dashboard ที่แสดงข้อมูลเชิงลึก และรายงานที่ปรับแต่งได้",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["Angular", "Chart.js", "Express", "MySQL"],
      github: "#",
      demo: "#",
    },
  ];
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // const scaleIn = {
  //   hidden: { opacity: 0, scale: 0.8 },
  //   visible: { opacity: 1, scale: 1 },
  // };

  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, {
    amount: 0.8,
    once: false,
  });

  const scrollToNext = () => {
    const next = heroRef.current?.nextElementSibling as HTMLElement;
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory overflow-x-hidden">
      {/* ===== PAGE 1 : SLOT ===== */}
      <section className="min-h-screen snap-start">
        <PortfolioGrid />
      </section>

      <section className="min-h-screen snap-start relative flex items-center justify-center py-6">
        <div className="max-w-6xl w-full">
          <h3 className=" text-white text-3xl font-semibold p-10">
            Work history
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
                <h3 className="text-white text-xl font-semibold">
                  Full-Stack Developer
                </h3>

                <Image
                  src="/images/poon_logo.png"
                  alt="Company logo"
                  width={160}
                  height={40}
                  className="object-contain"
                />
              </div>

              <p className="text-gray-400 text-sm mb-3">
                2023 – Present (Poontana Marketing Co., Ltd)
              </p>
              <p className="text-gray-300 leading-relaxed">
                ทำงานในตำแหน่ง Full-Stack Developer
                ออกแบบและพัฒนาเว็บแอปพลิเคชัน ERP
                ที่สามารถรองรับการขยายตัวของระบบ (Scalable) โดยใช้เทคโนโลยีฝั่ง
                Frontend และ Backend สมัยใหม่ พัฒนาระบบ ERP ที่มีโมดูลหลัก เช่น
                คลังสินค้า (Stock), การขาย (Sales), การจัดซื้อ (Purchasing),
                ใบเสนอราคา (Quotation) และรายงาน (Reporting) รวมถึงระบบสำหรับ
                การวางแผนการเข้าพบลูกค้า, การจัดการ Site Survey
                และการจัดตารางงานติดตั้ง/บำรุงรักษา พัฒนาฟีเจอร์ Barcode
                Scanning และระบบคำนวณทางการเงิน พร้อมทั้งนำหลักการ FIFO
                (First-In, First-Out) มาใช้ในการจัดการการขาย
                เพื่อให้ลูกค้าได้รับสินค้าล็อตใหม่ล่าสุด สร้างระบบ
                รายงานอัตโนมัติในรูปแบบ PDF และระบบ Workflow
                เพื่อเพิ่มประสิทธิภาพในการทำงานขององค์กร
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between gap-4 mt-6">
                <h3 className="text-white text-xl font-semibold">
                  Internship Developer
                </h3>

                <Image
                  className="items-center justify-center mb-2 rounded-md "
                  alt=""
                  src={"./images/dexon.jpg"}
                  width={160}
                  height={50}
                />
              </div>
              <p className="text-gray-400 text-sm mb-3 mt-10">
                4 months 2022 – 2023 (Dexon technologies Co., Ltd)
              </p>
              <p className="text-gray-300 leading-relaxed">
                Assisted in developing web applications and gained experience in
                frontend technologies use framework vue.js, Tailwind CSS to
                develop systems related to software engineering.
              </p>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="
            absolute bottom-8 right-8
            hidden md:block
            lg:hidden
            sm:hidden
            ms:hidden
            xl:block
          "
        >
          <Image
            src="/images/2590506.png"
            alt="Developer"
            width={320}
            height={170}
            className="object-contain"
          />
        </motion.div>
      </section>
      <section className="min-h-screen snap-start flex justify-center">
        <div className="w-full max-w-7xl px-6 py-6">
          <WorkCarousel />
        </div>
      </section>
      <section className="min-h-screen snap-start flex justify-center">
        <div className="w-full max-w-7xl px-6 pt-24">
          <UIShowcase />
        </div>
      </section>
    </div>
  );
}
