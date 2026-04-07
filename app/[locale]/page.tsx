// components/TypewriterHero.tsx
"use client";

// import Grid from "@mui/material/Grid";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
} from "framer-motion";
// import { useTranslations } from "next-intl";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Snowfall from "react-snowfall";
// import { useRouter } from "next/navigation";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import PortfolioGrid from "./about/PortfolioGrid";
// import WorkCarousel from "./about/WorkCarousel";
import DevTimeline from "./about/TimelineComponent";
import { Card } from "@mui/material";
import WorkHistory from "./components/WorkHistory";
import ContactPage from "./contact/page";
import { GitHub, LinkedIn } from "@mui/icons-material";

const rotatingWords = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
];

export interface SkillItem {
  icon: string;
  name: string;
  description: string;
  hueA: number;
  hueB: number;
}

const skills: SkillItem[] = [
  {
    icon: "/images/next.png",
    name: "NextJs",
    description:
      "พัฒนาเว็บแอประดับ Production ด้วย Next.js โดยใช้ App Router, Server Components และเทคนิคเพิ่มประสิทธิภาพด้าน SEO และ Performance",
    hueA: 600,
    hueB: 500,
  },

  {
    icon: "/images/Ts.png",
    name: "TypeScript",
    description:
      "เขียนโค้ดที่มีความปลอดภัยสูง ลด Bug และเพิ่มความสามารถในการดูแลระบบด้วย Static Typing",
    hueA: 140,
    hueB: 180,
  },
  {
    icon: "/images/vue.png",
    name: "Vue.js",
    description:
      "พัฒนาเว็บแอปด้วย Vue 3 และ Composition API เพื่อโครงสร้างที่ยืดหยุ่นและขยายระบบได้ง่าย",
    hueA: 80,
    hueB: 120,
  },
  {
    icon: "/images/tw.png",
    name: "Tailwind CSS",
    description:
      "ออกแบบ UI แบบ Responsive ได้รวดเร็วด้วย Utility-first CSS พร้อมควบคุมดีไซน์ได้อย่างยืดหยุ่น",
    hueA: 140,
    hueB: 180,
  },
  {
    icon: "/images/react.svg",
    name: "React",
    description:
      "พัฒนาเว็บแอปด้วย React 3 และ Composition API เพื่อโครงสร้างที่ยืดหยุ่นและขยายระบบได้ง่าย",
    hueA: 140,
    hueB: 180,
  },

  {
    icon: "/images/node.png",
    name: "NodeJS",
    description:
      "สร้างระบบ Backend ด้วย Node.js รองรับ REST API และการทำงานแบบ Asynchronous",
    hueA: 100,
    hueB: 140,
  },
  {
    icon: "/images/Express_logo.png",
    name: "Express",
    description:
      "พัฒนา REST API ที่รวดเร็วและยืดหยุ่น ด้วย Express.js สำหรับระบบ Backend",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/images/NestJS.svg",
    name: "NestJS",
    description:
      "พัฒนา Backend เชิงโครงสร้างด้วย NestJS รองรับ Clean Architecture และระบบขนาดใหญ่",
    hueA: 10,
    hueB: 0,
  },
  {
    icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/Prisma.svg",
    name: "Prisma",
    description:
      "จัดการฐานข้อมูลด้วย ORM ที่ทันสมัย ช่วยให้ Query ปลอดภัยและทำงานร่วมกับ TypeScript ได้อย่างราบรื่น",
    hueA: 170,
    hueB: 180,
  },
  {
    icon: "/images/JavaScript.svg",
    name: "JavaScript",
    description:
      "จัดการ State อย่างมีประสิทธิภาพใน React และ Next.js สำหรับการเชื่อมต่อและแสดงผลข้อมูลจาก API",
    hueA: 0,
    hueB: 100,
  },

  {
    icon: "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
    name: "Zustand",
    description:
      "จัดการ State อย่างมีประสิทธิภาพใน React และ Next.js สำหรับการเชื่อมต่อและแสดงผลข้อมูลจาก API",
    hueA: 0,
    hueB: 100,
  },

  {
    icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/MaterialUI-Dark.svg",
    name: "Material UI",
    description:
      "สร้าง UI มาตรฐานระดับองค์กรด้วย Component ที่พร้อมใช้งานและปรับแต่งได้สูง",
    hueA: 200,
    hueB: 240,
  },
  {
    icon: "/tach/NuxtJS.svg",
    name: "Nuxt",
    description:
      "พัฒนาเว็บแอปด้วย Nuxt.js สำหรับการสร้าง Progressive Web Apps และ SSR อย่างมีประสิทธิภาพ",
    hueA: 100,
    hueB: 140,
  },
  {
    icon: "/images/github.png",
    name: "GitHub",
    description:
      "ควบคุมเวอร์ชันโค้ดและจัดการ Workflow การ Deploy ด้วย Git และระบบ CI/CD อัตโนมัติ",
    hueA: 300,
    hueB: 340,
  },
  {
    icon: "/images/Pinialogo.svg",
    name: "Pinia ",
    description:
      "จัดการ State และการเชื่อมต่อ API ใน Vue.js อย่างเป็นระบบด้วย Pinia และ Vuex",
    hueA: 100,
    hueB: 100,
  },
  {
    icon: "/tach/Sequelize.svg",
    name: "Sequelize",
    description:
      "จัดการ Database ด้วย ORM ที่รองรับ PostgreSQL, MySQL และ SQLite",
    hueA: 260,
    hueB: 300,
  },
  {
    icon: "/images/ant.png",
    name: "Ant Design",
    description:
      "พัฒนา UI ระดับ Professional ด้วย Component สำเร็จรูปที่เหมาะกับระบบขนาดใหญ่",
    hueA: 200,
    hueB: 80,
  },
  {
    icon: "/tach/v-logo.svg",
    name: "Vuexy",
    description:
      "Admin Template ระดับพรีเมียมสำหรับสร้าง Dashboard และระบบหลังบ้านอย่างรวดเร็ว",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/tach/AWS.svg",
    name: "AWS",
    description:
      "Admin Template ระดับพรีเมียมสำหรับสร้าง Dashboard และระบบหลังบ้านอย่างรวดเร็ว",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/tach/Docker.svg",
    name: "Docker",
    description:
      "จัดการ Container สำหรับ Deploy และระบบ Microservices อย่างมีประสิทธิภาพ",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/tach/Ubuntu.svg",
    name: "Ubuntu",
    description:
      "จัดการ Container สำหรับ Deploy และระบบ Microservices อย่างมีประสิทธิภาพ",
    hueA: 10,
    hueB: 100,
  },
  {
    icon: "/devOps/k8s.svg",
    name: "Kubernetes",
    description:
      "บริหารจัดการระบบด้วย Kubernetes (K8s) เพื่อรองรับการทำงานแบบ Containerized Architecture ช่วยให้ระบบสามารถ Scale ได้อัตโนมัติ (Auto-scaling), เพิ่มความเสถียร (High Availability) และรองรับการ Deploy แบบ Rolling Update / Blue-Green Deployment เพื่อให้การอัปเดตระบบเป็นไปอย่างราบรื่นและไม่มี Downtime",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/devOps/Jenkins.png",
    name: "Jenkins",
    description:
      "จัดการ CI/CD Pipeline อย่างมีประสิทธิภาพด้วย Jenkins สำหรับการ Deploy อัตโนมัติ",
    hueA: 10,
    hueB: 100,
  },
  {
    icon: "/tach/NGINX_logo.svg",
    name: "Nginx",
    description:
      "จัดการ Container สำหรับ Deploy และระบบ Microservices อย่างมีประสิทธิภาพ",
    hueA: 100,
    hueB: 140,
  },
  {
    icon: "/tach/MongoDB.svg",
    name: "MongoDB",
    description:
      "จัดการ Container สำหรับ Deploy และระบบ Microservices อย่างมีประสิทธิภาพ",
    hueA: 100,
    hueB: 140,
  },
  {
    icon: "/tach/MySQL.svg",
    name: "MySQL",
    description:
      "จัดการ Container สำหรับ Deploy และระบบ Microservices อย่างมีประสิทธิภาพ",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/tach/Postgresql.svg",
    name: "Postgresql",
    description:
      "จัดการ Container สำหรับ Deploy และระบบ Microservices อย่างมีประสิทธิภาพ",
    hueA: 200,
    hueB: 200,
  },
  // {
  //   icon: "/images/Linux.svg",
  //   name: "Linux",
  //   description:
  //     "ใช้งาน Linux Server สำหรับ Deploy, Configure และดูแลระบบ Production",
  //   hueA: 220,
  //   hueB: 260,
  // },
];

const skillShowcaseRows: SkillItem[][] = [
  skills.slice(0, 7),
  skills.slice(7, 14),
  skills.slice(14),
];

// ============== Main Component ================
export default function TypewriterHero() {
  // const [show, setShow] = useState(false);

  // const t = useTranslations("Home");
  const greetingText = `Nanthawat Inthisaen`;
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const docHeight = document.documentElement.scrollHeight;

  //     // 👇 ถึงล่างสุด (เผื่อ 50px)
  //     const isBottom = scrollTop + windowHeight >= docHeight - 50;
  //     setShow(isBottom);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll();

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  // Typewriter logic (เหมือนเดิม)
  const greetingCount = useMotionValue(0);
  const greetingRounded = useTransform(greetingCount, Math.round);
  const greetingDisplay = useTransform(greetingRounded, (latest) =>
    greetingText.slice(0, latest),
  );

  const wordIndex = useMotionValue(0);
  const wordCount = useMotionValue(0);
  const wordRounded = useTransform(wordCount, Math.round);
  const currentWord = useTransform(
    wordIndex,
    (latest) => rotatingWords[latest % rotatingWords.length],
  );
  const wordDisplay = useTransform(wordRounded, (latest) => {
    const text = currentWord.get();
    return latest <= text.length ? text.slice(0, latest) : text;
  });

  const [isGreetingComplete, setIsGreetingComplete] = useState(false);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const profileScrollY = useTransform(scrollYProgress, [0, 1], [0, -144]);
  const profileScrollScale = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 1.03, 0.98],
  );
  const profileScrollRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  useEffect(() => {
    const controls = animate(greetingCount, greetingText.length, {
      duration: greetingText.length * 0.08,
      ease: "easeOut",
      delay: 0.5,
      onComplete: () => setIsGreetingComplete(true),
    });
    return () => controls.stop();
  }, []);

  useEffect(() => {
    if (!isGreetingComplete) return;

    let controls: ReturnType<typeof animate> | null = null;
    const runWordAnimation = () => {
      const wordLength =
        rotatingWords[wordIndex.get() % rotatingWords.length].length;
      controls = animate(wordCount, wordLength, {
        type: "tween",
        ease: "easeIn",
        duration: wordLength * 0.07,
        onComplete: () => {
          setTimeout(() => {
            controls = animate(wordCount, 0, {
              type: "tween",
              ease: "easeOut",
              duration: wordLength * 0.05,
              onComplete: () => {
                wordIndex.set(wordIndex.get() + 1);
                runWordAnimation();
              },
            });
          }, 1500);
        },
      });
    };
    runWordAnimation();
    return () => controls?.stop();
  }, [isGreetingComplete]);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        <section
          id="home"
          ref={heroSectionRef}
          className="relative snap-start min-h-screen  scroll-mt-16 overflow-hidden flex items-center justify-center px-6"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Snowfall
              snowflakeCount={50}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
          </div>

          {/* Ambient glow blobs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blue-500/8 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-center gap-20 max-w-7xl w-full my-20">
            {/* ===== LEFT: Text ===== */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              {/* Greeting */}
              <h1 className="text-4xl md:text-4xl font-light text-gray-500 tracking-[0.3em] uppercase">
                <motion.span className="inline-block">
                  <motion.span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-gray-200 to-gray-500 font-semibold">
                    {greetingDisplay}
                  </motion.span>
                  {!isGreetingComplete && (
                    <motion.span
                      className="inline-block w-0.5 h-5 ml-1 bg-cyan-400 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  )}
                </motion.span>
              </h1>

              {/* Name / Role */}
              <div className="space-y-2">
                <div className="text-2xl md:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-gray-400 leading-tight">
                  <motion.span className="flex items-center justify-center lg:justify-start">
                    <motion.span>{wordDisplay}</motion.span>
                    <motion.span
                      className="inline-block w-0.5 h-12 ml-2 bg-cyan-400"
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  </motion.span>
                </div>
                <p className="text-gray-500 text-lg tracking-wider">
                  Wave · 24 years old
                </p>
              </div>

              {/* Divider */}
              <div className="w-16 h-px bg-gradient-to-r from-cyan-400 to-transparent mx-auto lg:mx-0" />

              {/* Stats row */}
              <Card
                sx={{
                  borderRadius: "12px",
                  padding: "20px",
                  width: { xs: "100%", sm: "80%", md: "400px", lg: "500px" },
                  background: "rgba(20,20,40,0.7)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <motion.div
                  className="flex items-center justify-center lg:justify-start gap-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  {[
                    { value: "2+", label: "Years Exp." },
                    { value: "5+", label: "Projects" },
                    { value: "10+", label: "Technologies" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <div className="px-4 text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                        {stat.value}
                      </div>
                      <div className=" px-4 text-xs text-gray-500 tracking-widest uppercase mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  className="flex items-center justify-center lg:justify-start gap-4 pt-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <button
                    onClick={() =>
                      window.open("https://github.com/OASISAsx", "_blank")
                    }
                    className="flex justify-center items-center px-6 cursor-pointer py-2.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-sm tracking-wider hover:bg-cyan-400/20 transition-all duration-300"
                  >
                    <GitHub />
                    <span className="px-2">GitHub</span>
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/nanthawat-inthisaen-b6a409305",
                        "_blank",
                      )
                    }
                    className="flex justify-center items-center px-6 cursor-pointer py-2.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-sm tracking-wider hover:bg-cyan-400/20 transition-all duration-300"
                  >
                    <LinkedIn />
                    <span className="px-2">LinkedIn</span>
                  </button>
                </motion.div>
              </Card>
            </div>

            {/* ===== RIGHT: Profile Image ===== */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              style={{
                y: profileScrollY,
                scale: profileScrollScale,
                rotate: profileScrollRotate,
              }}
            >
              <div className="absolute inset-x-8 bottom-3 h-8 rounded-full bg-cyan-400/20 blur-2xl" />
              <div className="absolute inset-x-10 bottom-0 h-6 rounded-full bg-blue-500/25 blur-xl" />

              {/* Outer glow ring */}
              <div className="absolute inset-6 rounded-[40%] bg-gradient-to-b from-cyan-400/16 via-transparent to-blue-500/16 blur-3xl" />

              {/* Image */}
              <motion.img
                src="/images/profile2Fix.png"
                alt="Profile"
                className="profile-cutout-image relative z-10 w-[18rem] md:w-[22rem] lg:w-[24rem] h-auto object-contain saturate-105 contrast-110"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Overlay shimmer */}
              <div className="pointer-events-none absolute inset-x-12 top-8 h-24 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-16 bottom-8 h-20 rounded-full bg-cyan-300/10 blur-3xl" />

              {/* Floating badge */}
              {/* <motion.div
                className="absolute bottom-4 -left-2 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2.5"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-300 tracking-wider">
                  Available for work
                </span>
              </motion.div> */}
            </motion.div>
          </div>
        </section>
        <section
          id="about"
          className="min-h-screen snap-start relative flex items-center justify-center"
        >
          <WorkHistory />
        </section>

        {/* ===== STACKED CARDS SECTION (ด้านล่าง) ===== */}
        <section
          id="skills"
          className="snap-start min-h-screen relative flex flex-col justify-center px-4  overflow-hidden scroll-mt-16"
        >
          <div className="absolute top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute bottom-20 right-8 h-56 w-56 rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <motion.div
              className="mb-10 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-cyan-200">
                Toolkit
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                My Skills Passion
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-xs text-gray-400 md:text-base">
                Tech stack ที่ผมใช้สร้างงานจริงทั้ง frontend, backend และ
                deployment
              </p>
            </motion.div>

            <div className="space-y-4 [perspective:1400px]">
              {skillShowcaseRows.map((row, rowIndex) => {
                const isReverse = rowIndex % 2 === 1;
                const duration = 42 + rowIndex * 6;

                return (
                  <div
                    key={`skills-row-${rowIndex}`}
                    className="relative overflow-hidden rounded-[1.6rem] border border-white/8 bg-white/[0.035] px-3 py-3 shadow-[0_20px_56px_rgba(3,8,20,0.28)] backdrop-blur-xl"
                  >
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#07101f] via-[#07101f]/70 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#07101f] via-[#07101f]/70 to-transparent" />

                    <motion.div
                      className="flex w-max gap-3 md:gap-4"
                      animate={{
                        x: isReverse ? ["-50%", "0%"] : ["0%", "-50%"],
                      }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {[...row, ...row].map((skill, cardIndex) => (
                        <div
                          key={`${skill.name}-${rowIndex}-${cardIndex}`}
                          className="relative h-[142px] w-[136px] shrink-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-b from-white/10 via-slate-950/80 to-slate-950/95 p-3 md:h-[170px] md:w-[168px]"
                        >
                          <div
                            className="absolute inset-0 opacity-75"
                            style={{
                              background: `radial-gradient(circle at top,
                              hsla(${skill.hueA}, 100%, 68%, 0.30),
                              transparent 52%),
                              linear-gradient(135deg,
                              hsla(${skill.hueA}, 100%, 60%, 0.14),
                              hsla(${skill.hueB}, 100%, 60%, 0.06))`,
                            }}
                          />
                          <div className="absolute inset-x-4 bottom-2 h-8 rounded-full bg-black/35 blur-2xl" />

                          <div className="relative z-10 flex h-full flex-col">
                            <div className="mb-2 flex items-start justify-between">
                              <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/70">
                                {String((cardIndex % row.length) + 1).padStart(
                                  2,
                                  "0",
                                )}
                              </span>
                              <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-white/55">
                                Skill
                              </span>
                            </div>

                            <div className="relative flex flex-1 items-center justify-center">
                              <div
                                className="absolute h-16 w-16 rounded-full blur-2xl"
                                style={{
                                  background: `radial-gradient(circle,
                                  hsla(${skill.hueB}, 100%, 68%, 0.42),
                                  transparent 72%)`,
                                }}
                              />
                              <div className="relative h-[58px] w-[58px] md:h-[70px] md:w-[70px]">
                                <Image
                                  src={skill.icon}
                                  alt={skill.name}
                                  fill
                                  className="object-contain drop-shadow-[0_12px_28px_rgba(15,23,42,0.45)] select-none"
                                  draggable={false}
                                />
                              </div>
                            </div>

                            <div className="relative z-10 mt-2">
                              <h3 className="text-xs font-semibold tracking-[0.08em] text-white md:text-sm">
                                {skill.name}
                              </h3>
                              {/* <p className="mt-1 line-clamp-2 text-[10px] text-gray-400 md:text-[11px]">
                                {skill.description}
                              </p> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* <section className="min-h-screen snap-start">
        <PortfolioGrid />
      </section> */}
        <section id="projects" className="min-h-screen snap-start">
          <DevTimeline />
        </section>

        <section id="contact" className="min-h-screen snap-start">
          <ContactPage />
        </section>

        {/* <motion.button
        onClick={() => {
          window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-70 hover:opacity-100"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg
          xmlns="https://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.button> */}
        {/* <AnimatePresence>
        {show && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <motion.button
              ref={ref}
              onClick={onClickMove}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="px-10 py-4 rounded-2xl bg-white text-black font-semibold overflow-hidden shadow-lg
                   xs:size-sm sm:size-md md:size-lg lg:size-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                style={{ x: springX, y: springY }}
                className="flex items-center"
              >
                About Me
                <ArrowForwardIosIcon className="ml-2 text-black" />
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence> */}
      </div>
    </>
  );
}
