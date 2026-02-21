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
type TimeLineType = {
  year: string;
  title: string;
  company: string;
  desc: string;
  image: string;
};

export const timeline: TimeLineType[] = [
  {
    year: "2025",
    title: "Developer",
    company: "eims Stock",
    desc: "Developed ERP system with vue3, Nuxt, pinia, Express.js",
    image: "../images/eims.png",
  },
  {
    year: "2025",
    title: "Developer",
    company: "Zillion",
    desc: "Developed ERP system with vue3, Nuxt, pinia, NestJs Prisma",
    image: "../zillion/8.png",
  },
  {
    year: "2025",
    title: "Developer",
    company: "EliteFund",
    desc: "Developed ERP system with Next, NestJS, MongoDB",
    image: "../images/EliteFund.png",
  },

  {
    year: "2025",
    title: "DevOps",
    company: "set CI/CD pipelines in Project ",
    desc: "Ubuntu,Nginx,Git Action, Docker ",
    image: "../images/CICD.png",
  },
  {
    year: "2024",
    title: "Icon Dexon",
    company: "Design Icon",
    desc: "Design in Photoshop",
    image: "../images/iconDexon.png",
  },
  {
    year: "2024",
    title: "DIS Team",
    company: "Dexon",
    desc: "Intern Project",
    image: "../images/timeDexxon.jpg",
  },
  {
    year: "2024",
    title: "Intern Developer",
    company: "Certificate",
    desc: "A certificate of effective and practical work. ",
    image: "../images/certificave.jpg",
  },
  {
    year: "2024",
    title: "Dexon Project",
    company: "PTT",
    desc: "Developed using Vue2 and.Net core",
    image: "../images/dexon1.jpg",
  },
  {
    year: "2023",
    title: " Final Project Study",
    company: "ซื้อขายของสะสม",
    desc: "Developed using React , Next.js and Golang gin and gorm",
    image: "../images/colection.png",
  },
];
