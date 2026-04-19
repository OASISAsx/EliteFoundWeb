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
import { useTranslations } from "next-intl";

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

export interface SkillItem {
  icon: string;
  name: string;
  key: string;
  description: string;
  hueA: number;
  hueB: number;
}

const skills: SkillItem[] = [
  // Frontend Frameworks

  {
    icon: "/images/next.png",
    name: "NextJs",
    key: "nextjs",
    description: "",
    hueA: 600,
    hueB: 500,
  },
  {
    icon: "/images/vue.png",
    name: "Vue.js",
    key: "vuejs",
    description: "",
    hueA: 80,
    hueB: 120,
  },
  {
    icon: "/tach/NuxtJS.svg",
    name: "Nuxt",
    key: "nuxt",
    description: "",
    hueA: 100,
    hueB: 140,
  },
  // Languages
  {
    icon: "/images/JavaScript.svg",
    name: "JavaScript",
    key: "javascript",
    description: "",
    hueA: 600,
    hueB: 500,
  },
  {
    icon: "/images/Ts.png",
    name: "TypeScript",
    key: "typescript",
    description: "",
    hueA: 140,
    hueB: 180,
  },
  {
    icon: "/images/tw.png",
    name: "Tailwind CSS",
    key: "tailwindcss",
    description: "",
    hueA: 140,
    hueB: 180,
  },
  {
    icon: "/images/react.svg",
    name: "React",
    key: "react",
    description: "",
    hueA: 140,
    hueB: 180,
  },
  {
    icon: "/images/node.png",
    name: "NodeJS",
    key: "nodejs",
    description: "",
    hueA: 100,
    hueB: 140,
  },
  {
    icon: "/images/Express_logo.png",
    name: "Express",
    key: "express",
    description: "",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/images/NestJS.svg",
    name: "NestJS",
    key: "nestjs",
    description: "",
    hueA: 10,
    hueB: 0,
  },
  {
    icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/Prisma.svg",
    name: "Prisma",
    key: "prisma",
    description: "",
    hueA: 170,
    hueB: 180,
  },
  {
    icon: "/tach/Sequelize.svg",
    name: "Sequelize",
    key: "sequelize",
    description: "",
    hueA: 260,
    hueB: 300,
  },
  {
    icon: "/images/rabbitmq-icon.svg",
    name: "RabbitMQ",
    key: "rabbitmq",
    description: "",
    hueA: 10,
    hueB: 100,
  },
  {
    icon: "/images/redux-icon.svg",
    name: "Redux",
    key: "redux",
    description: "",
    hueA: 0,
    hueB: 100,
  },
  {
    icon: "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
    name: "Zustand",
    key: "zustand",
    description: "",
    hueA: 0,
    hueB: 100,
  },
  {
    icon: "/images/Pinialogo.svg",
    name: "Pinia",
    key: "pinia",
    description: "",
    hueA: 100,
    hueB: 100,
  },
  {
    icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/MaterialUI-Dark.svg",
    name: "Material UI",
    key: "materialui",
    description: "",
    hueA: 200,
    hueB: 240,
  },

  {
    icon: "/images/ant.png",
    name: "Ant Design",
    key: "antdesign",
    description: "",
    hueA: 200,
    hueB: 80,
  },
  // {
  //   icon: "/tach/v-logo.svg",
  //   name: "Vuexy",
  //   key: "vuexy",
  //   description: "",
  //   hueA: 200,
  //   hueB: 200,
  // },
  {
    icon: "/images/github.png",
    name: "GitHub",
    key: "github",
    description: "",
    hueA: 300,
    hueB: 340,
  },
  {
    icon: "/tach/AWS.svg",
    name: "AWS",
    key: "aws",
    description: "",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/tach/Docker.svg",
    name: "Docker",
    key: "docker",
    description: "",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/tach/Ubuntu.svg",
    name: "Ubuntu",
    key: "ubuntu",
    description: "",
    hueA: 10,
    hueB: 100,
  },
  {
    icon: "/devOps/k8s.svg",
    name: "Kubernetes",
    key: "kubernetes",
    description: "",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/devOps/jenkins.svg",
    name: "Jenkins",
    key: "jenkins",
    description: "",
    hueA: 10,
    hueB: 100,
  },
  {
    icon: "/tach/NGINX_logo.svg",
    name: "Nginx",
    key: "nginx",
    description: "",
    hueA: 100,
    hueB: 140,
  },
  {
    icon: "/tach/MongoDB.svg",
    name: "MongoDB",
    key: "mongodb",
    description: "",
    hueA: 100,
    hueB: 140,
  },
  {
    icon: "/tach/MySQL.svg",
    name: "MySQL",
    key: "mysql",
    description: "",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/tach/Postgresql.svg",
    name: "Postgresql",
    key: "postgresql",
    description: "",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/images/copilot-icon.svg",
    name: "GitHub Copilot",
    key: "githubCopilot",
    description: "",
    hueA: 200,
    hueB: 200,
  },
  {
    icon: "/images/claude-ai-icon.svg",
    name: "Claude Code",
    key: "claudeCode",
    description: "",
    hueA: 10,
    hueB: 100,
  },
];

// ============== Main Component ================
export default function TypewriterHero() {
  // const [show, setShow] = useState(false);

  const t = useTranslations("Home");
  const tSkills = useTranslations("skills");
  const greetingText = t("greeting");

  // Rotating words with translations
  const rotatingWords = [
    t("roles.fullstack"),
    t("roles.frontend"),
    t("roles.backend"),
    t("roles.devops"),
  ];
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
                  {t("nickname")}
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
                    { value: "2+", label: t("stats.yearsExp") },
                    { value: "5+", label: t("stats.projects") },
                    { value: "10+", label: t("stats.technologies") },
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
            </motion.div>
          </div>
        </section>
        <section
          id="about"
          className="min-h-screen snap-start relative pb-20 flex items-center justify-center"
        >
          <WorkHistory />
        </section>

        {/* ===== STACKED CARDS SECTION (ด้านล่าง) ===== */}
        <section
          id="skills"
          className="snap-start min-h-screen relative flex flex-col justify-center px-4 p-10 overflow-hidden scroll-mt-16"
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
                {tSkills("badge")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                {tSkills("title")}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-xs text-gray-400 md:text-base">
                {tSkills("description")}
              </p>
            </motion.div>

            {/* Modern Grid Layout - Compact & Fast */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.03,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.08,
                    transition: { duration: 0.2 },
                  }}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-slate-950/90 p-2.5 transition-shadow hover:border-white/20 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
                >
                  {/* Gradient Glow on Hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 0%,
                        hsla(${skill.hueA}, 80%, 60%, 0.12),
                        transparent 60%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon - Smaller */}
                    <div className="relative mb-2 h-12 w-12 transition-transform duration-300 group-hover:scale-110">
                      <div
                        className="absolute inset-0 rounded-full opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50"
                        style={{
                          background: `radial-gradient(circle, hsla(${skill.hueB}, 90%, 65%, 0.4), transparent 70%)`,
                        }}
                      />
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        className="object-contain drop-shadow-md select-none"
                        draggable={false}
                      />
                    </div>

                    {/* Skill Name - Smaller */}
                    <h3 className="text-[10px] font-semibold text-white transition-colors group-hover:text-cyan-200 sm:text-xs">
                      {skill.name}
                    </h3>

                    {/* Translated description tooltip */}
                    <div className="pointer-events-none absolute -bottom-1 left-1/2 z-50 w-48 -translate-x-1/2 translate-y-full rounded-lg border border-white/10 bg-slate-900/95 px-3 py-2 text-[10px] leading-relaxed text-gray-300 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                      {tSkills(`items.${skill.key}`)}
                    </div>

                    {/* Index number - Smaller */}
                    <span className="mt-1 text-[8px] font-mono tracking-wider text-white/25 transition-colors group-hover:text-cyan-400/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Subtle shine effect on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -left-full h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_ease-in-out]" />
                  </div>
                </motion.div>
              ))}
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
