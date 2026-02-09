// components/TypewriterHero.tsx
"use client";

import Grid from "@mui/material/Grid";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  Variants,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Snowfall from "react-snowfall";
import { useRouter } from "next/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const greetingText = "Hi, I'm Nanthawat Inthisaen";
const rotatingWords = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Creative Coder",
];

// ============== Card Animation Styles ================
// const cardVariants: Variants = {
//   offscreen: {
//     y: 300,
//   },
//   onscreen: {
//     y: 20,
//     rotate: -10,
//     transition: {
//       type: "spring",
//       bounce: 0.4,
//       duration: 0.8,
//     },
//   },
// };

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

const containerStyle: React.CSSProperties = {
  padding: "100px 0",
  maxWidth: "auto",
  margin: "0 auto",
  position: "relative",
};

// const cardContainerStyle: React.CSSProperties = {
//   overflow: "hidden",
//   display: "flex",
//   width: "100%", // ✅ จาก 700 → auto
//   maxWidth: 600,
//   justifyContent: "center",
//   alignItems: "center",
//   position: "relative",
//   paddingRight: 0, // ✅ เอาออก
//   paddingTop: 20,
//   marginBottom: -80, // ลดนิดหน่อย
// };

const splashStyle = (hueA: number, hueB: number): React.CSSProperties => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
});

// const cardStyle: React.CSSProperties = {
//   fontSize: 140,
//   width: "min(280px, 100vw)", // ✅ mobile safe
//   height: "auto",
//   aspectRatio: "300 / 430", // รักษาสัดส่วน
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   borderRadius: 20,
//   background: "#1a1a1a",
//   color: "#fff",
//   boxShadow:
//     "0 0 1px hsl(0deg 0% 100% / 0.1), 0 0 8px hsl(0deg 0% 100% / 0.1), 0 0 16px hsl(0deg 0% 100% / 0.1), inset 0 0 20px rgba(0,0,0,0.5)",
//   transformOrigin: "10% 60%",
// };
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
    icon: "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
    name: "Zustand",
    description:
      "จัดการ State อย่างมีประสิทธิภาพใน React และ Next.js สำหรับการเชื่อมต่อและแสดงผลข้อมูลจาก API",
    hueA: 0,
    hueB: 100,
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
    icon: "/images/node.png",
    name: "Node.js",
    description:
      "สร้างระบบ Backend ด้วย Node.js รองรับ REST API และการทำงานแบบ Asynchronous",
    hueA: 100,
    hueB: 140,
  },
  {
    icon: "/images/Express.svg",
    name: "Express.js",
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
    icon: "/images/tw.png",
    name: "Tailwind CSS",
    description:
      "ออกแบบ UI แบบ Responsive ได้รวดเร็วด้วย Utility-first CSS พร้อมควบคุมดีไซน์ได้อย่างยืดหยุ่น",
    hueA: 140,
    hueB: 180,
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
    icon: "/images/github.png",
    name: "Git & CI/CD",
    description:
      "ควบคุมเวอร์ชันโค้ดและจัดการ Workflow การ Deploy ด้วย Git และระบบ CI/CD อัตโนมัติ",
    hueA: 300,
    hueB: 340,
  },
  {
    icon: "/images/Pinialogo.svg",
    name: "Pinia & Vuex",
    description:
      "จัดการ State และการเชื่อมต่อ API ใน Vue.js อย่างเป็นระบบด้วย Pinia และ Vuex",
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
    icon: "/images/vuexys.webp",
    name: "Vuexy",
    description:
      "Admin Template ระดับพรีเมียมสำหรับสร้าง Dashboard และระบบหลังบ้านอย่างรวดเร็ว",
    hueA: 300,
    hueB: 300,
  },
  {
    icon: "/images/Linux.svg",
    name: "Linux",
    description:
      "ใช้งาน Linux Server สำหรับ Deploy, Configure และดูแลระบบ Production",
    hueA: 220,
    hueB: 260,
  },
];

// ============== Main Component ================
export default function TypewriterHero() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 👇 ถึงล่างสุด (เผื่อ 50px)
      const isBottom = scrollTop + windowHeight >= docHeight - 50;
      setShow(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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

  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // spring นุ่ม ๆ
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    // จำกัดระยะการเคลื่อนไหว (ยิ่งเล็กยิ่ง iOS)
    x.set(offsetX * 0.15);
    y.set(offsetY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [isGreetingComplete, setIsGreetingComplete] = useState(false);
  // const { data: session, status } = useSession();
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     session?.user && console.log("User ID:", session.user.id);
  //   } else if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [router]);
  const onClickMove = () => {
    router.push("/about");
  };
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

      <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Snowfall
            snowflakeCount={50}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-7xl w-full">
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-2xl xs:text-2xl md:text-4xl lg:text-6xl font-light text-gray-400 tracking-wider">
              <motion.span className="inline-block">
                <motion.span>{greetingDisplay}</motion.span>
                {!isGreetingComplete && (
                  <motion.span
                    className="inline-block w-1 h-12 ml-1 bg-gray-400 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                )}
              </motion.span>
            </h1>

            <div className="text-2xl xs:text-2xl md:text-6xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              <motion.span className="flex items-center justify-center lg:justify-start">
                <motion.span>{wordDisplay}</motion.span>
                <motion.span
                  className="inline-block w-1 h-12 ml-2 bg-white"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              </motion.span>
            </div>

            <p className="mt-12 text-xl text-gray-500">Wave | 23 age</p>
          </div>

          <motion.div
            className="relative w-80 h-96"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src="/images/profile2.png"
              alt="Profile"
              className="
      w-full h-full object-cover
      rounded-2xl
      border border-white/10
      saturate-90 contrast-105
    "
              animate={{
                boxShadow: [
                  "0 12px 30px rgba(0,0,0,0.25)",
                  "0 18px 45px rgba(0,0,0,0.35)",
                  "0 12px 30px rgba(0,0,0,0.25)",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/6 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>
      {/* ===== STACKED CARDS SECTION (ด้านล่าง) ===== */}
      <section className="relative py-10 px-6 pb-32 overflow-hidden">
        <div className="text-center mb-2">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Skills & Passion
          </h2>
          <p className="text-gray-400 text-lg">สิ่งที่ฉันรักและเชี่ยวชาญ</p>
        </div>

        <section className="py-16 px-6 overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-x-16 gap-y-28 max-w-7xl mx-auto">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className="flex flex-col md:flex-row items-center justify-center gap-10 mb-20"
              >
                {/* ===== CARD ===== */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="relative"
                >
                  {/* Static Glow (นิ่ง) */}
                  <div
                    className="absolute inset-0 blur-2xl opacity-25"
                    style={{
                      background: `linear-gradient(
        135deg,
        hsl(${skill.hueA}, 100%, 60%),
        hsl(${skill.hueB}, 100%, 60%)
      )`,
                    }}
                  />

                  {/* Static Icon */}
                  <div className="relative z-10">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={120}
                      height={120}
                      className="object-contain select-none"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>
      </section>
      <motion.button
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
          xmlns="http://www.w3.org/2000/svg"
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
      </motion.button>
      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
}
