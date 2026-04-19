"use client";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "CI/CD Pipeline & Server Deployment",
    description:
      "ออกแบบและพัฒนา CI/CD pipeline สำหรับเว็บแอปพลิเคชัน โดยมีการทำงานอัตโนมัติในขั้นตอนการ build, test และ deploy พร้อมทั้งตั้งค่าเซิร์ฟเวอร์ Linux, จัดการ Docker containers, Nginx reverse proxy, ระบบ SSL และการเชื่อมต่อโดเมนสำหรับใช้งานจริงในระดับ production",
    image: "../images/DevOps.jpeg",
    tech: [
      "Linux",
      "Ubuntu",
      "Docker",
      "Docker Compose",
      "Nginx",
      "CI/CD",
      "GitHub Actions",
    ],
  },
  {
    id: "p2",
    title: "Data Structure",
    description:
      "ออกแบบและพัฒนาโครงสร้างข้อมูล (Data Structure) เพื่อรองรับการทำงานของระบบอย่างมีประสิทธิภาพออกแบบ Data Structure สำหรับการจัดการข้อมูลในระบบ Backend และ Database",
    image: "../images/data-structure.png",
    tech: ["Draw.io", "Prisma Studio", "DBeaver "],
  },
  {
    id: "p3",
    title: "System Analyst",
    description:
      "รับ Requirement จากลูกค้า วิเคราะห์ความต้องการของระบบ และออกแบบแนวทางการพัฒนาระบบ (System Analysis) รวมถึง Data Flow, Process Flow และโครงสร้างข้อมูล เพื่อรองรับการพัฒนา Backend",
    image: "../images/systemAnalyst.jpg",
    tech: [
      "System Analysis",
      "Requirement Gathering",
      "Process Flow",
      "Data Structure Design",
    ],
  },
  {
    id: "p4",
    title: "Application Security",
    description:
      "ออกแบบและดูแลความปลอดภัยของระบบ (Security) โดยครอบคลุม Authentication, Authorization, JWT, การเข้ารหัสรหัสผ่าน และการจัดการ Secret สำหรับระบบ Backend และ Production Environment",

    image: "../images/jwt.png",
    tech: [
      "JWT",
      "Role-Based Access Control (RBAC)",
      "Password Encryption",
      "HTTPS",
      "Secure API",
    ],
  },

  //   {
  //     id: "p5",
  //     title: "Finance Dashboard",
  //     description: "Modern dashboard with realtime data and smooth motion.",
  //     image: "../images/1.jpg",
  //     tech: ["Next.js", "Prisma", "MongoDB"],
  //   },
  //   {
  //     id: "p6",
  //     title: "Landing Page",
  //     description: "High-conversion landing with motion micro-interactions.",
  //     image: "../images/1.jpg",
  //     tech: ["Next.js", "Tailwind", "Motion"],
  //   },
];
export type TimeLineType = {
  year: string;
  title: string;
  company: string;
  desc: string;
  image: string;
  items: ReactNode;
};
import { ReactNode } from "react";
import UIShowcase from "./StockCarousel";
import UIShowcaseZ from "./ZCarousel";
import UIShowcasePoon from "./PoonCarousel";
import UIDevOpsShowcase from "./DevOpsCarousel";
import UIShowcaseDexon from "./DexonCarousel";
import UIShowcaseColection from "./finalCarousel";

export const timeline: TimeLineType[] = [
  {
    year: "2025 - Present",
    title: "Full Stack Developer",
    company: "EIMS Stock",
    desc: "Developed system with NextJS, Zustand, NestJS, Express ,Prisma",
    image: "../stocks/eimsLogin.png",
    items: <UIShowcase />,
  },
  {
    year: "2025 - Present",
    title: "Full Stack Developer",
    company: "Zillion",
    desc: "Developed ERP system with vue3, Nuxt, Pinia, NestJs Prisma",
    image: "../zillion/8.png",
    items: <UIShowcaseZ />,
  },
  {
    year: "2024 - Present",
    title: "Full Stack Developer",
    company: "Poon EWork ERP",
    desc: "Developed ERP system with Vue2, Express.js, Sequelize , MySQL",
    image: "../poon/poonLogin.png",
    items: <UIShowcasePoon />,
  },

  {
    year: "2024 - Present",
    title: "DevOps",
    company: "Setting CI/CD pipelines in Project ",
    desc: "Ubuntu Linux, Nginx, Git Action, Docker",
    image: "../images/DevOps.jpeg",
    items: <UIDevOpsShowcase />,
  },
  // {
  //   year: "2024",
  //   title: "Icon Design",
  //   company: "DEXON TECHNOLOGY PUBLIC COMPANY LIMITED",
  //   desc: "Design in Photoshop",
  //   image: "../images/iconDexon.png",
  //   items: <UIShowcase />,
  // },
  // {
  //   year: "2024",
  //   title: "DIS Team",
  //   company: "DEXON TECHNOLOGY PUBLIC COMPANY LIMITED",
  //   desc: "Intern Project",
  //   image: "../images/timeDexxon.jpg",
  //   items: <UIShowcase />,
  // },
  // {
  //   year: "2024",
  //   title: "Certificate",
  //   company: "DEXON TECHNOLOGY PUBLIC COMPANY LIMITED",
  //   desc: "A certificate of effective and practical work. ",
  //   image: "../images/certificave.jpg",
  //   items: <UIShowcase />,
  // },
  {
    year: "Nov 2023 - Feb 2024",
    title: "PTT Project",
    company: "DEXON TECHNOLOGY PLC.",
    desc: "Developed using Vue2 and C# .Net core",
    image: "../works/work1.jpg",
    items: <UIShowcaseDexon />,
  },
  {
    year: "Feb 2023 - Sep 2023",
    title: " Final Project Study",
    company: "Buy and sell collectibles",
    desc: "Developed using React , Next.js and Golang ,Gin",
    image: "../images/colection.png",
    items: <UIShowcaseColection />,
  },
];
