// components/TypewriterHero.tsx
"use client";

// import Grid from "@mui/material/Grid";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
// import { useTranslations } from "next-intl";

import { useEffect, useState } from "react";
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
    name: "Next.js",
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
    name: "React.js",
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

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-20 max-w-7xl w-full my-20">
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
              className="relative shrink-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/10 blur-xl" />

              {/* Border frame */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-400/30 via-white/5 to-transparent" />

              {/* Image */}
              <motion.img
                src="/images/profile2.png"
                alt="Profile"
                className="relative w-72 h-88 md:w-80 md:h-96 object-cover rounded-2xl saturate-90 contrast-105"
                style={{ height: "24rem" }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Overlay shimmer */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400/5 via-transparent to-white/5" />

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-5 -left-5 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2.5"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-300 tracking-wider">
                  Available for work
                </span>
              </motion.div>
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
          className="snap-start min-h-screen flex flex-col justify-center px-6 overflow-hidden scroll-mt-16"
        >
          <div className="text-center mb-2">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Skills & Passion
            </h2>
            <p className="text-gray-400 text-lg">Library & FrameWork</p>
          </div>

          <section className="py-16 overflow-hidden">
            <style>{`
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee 40s linear infinite;
    }
    .marquee-wrapper {
      -webkit-mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
      );
      mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
      );
    }
  `}</style>

            <div className="marquee-wrapper relative overflow-hidden py-16">
              <div className="marquee-track gap-16">
                {[...skills, ...skills].map((skill, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center gap-3 w-[120px] shrink-0"
                  >
                    <div className="relative">
                      <div
                        className="absolute inset-0 blur-2xl opacity-25"
                        style={{
                          background: `linear-gradient(135deg,
                        hsl(${skill.hueA}, 100%, 60%),
                        hsl(${skill.hueB}, 100%, 60%))`,
                        }}
                      />
                      <div className="relative z-10 w-[90px] h-[90px]">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          fill
                          className="object-contain select-none"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
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
