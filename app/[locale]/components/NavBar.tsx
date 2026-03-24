"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  // ปิด menu เมื่อ resize → desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleDownloadPDF = async () => {
    try {
      setIsPdfLoading(true);

      const response = await fetch("/PDF/Resume.pdf");
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "profile.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file. Please try again.");
    } finally {
      setTimeout(() => {
        setIsPdfLoading(false);
      }, 500); // 1 วินาที
    }
  };
  useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            const found = navLinks.find((l) => l.id === id);
            if (found) {
              setActive(found.label);
            }
          }
        });
      },
      {
        root: null, // ถ้า scroll ใน div เดี๋ยวแก้ด้านล่าง
        rootMargin: "-50% 0px -50% 0px", // เอากลางจอเป็นตัวตัด
        threshold: 0,
      },
    );

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          backgroundColor:
            active === "Home" ? "rgba(3,7,18,0)" : "rgba(3,7,18,0.8)",
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-white font-bold text-xl tracking-wider select-none"
          >
            Wave
            <span className="text-cyan-400">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1 cursor-pointer">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  key={link.label}
                  onClick={() => {
                    setActive(link.label);
                    scrollTo(link.id);
                  }}
                  className="relative px-4 py-2 text-sm tracking-wider transition-colors duration-200 group block"
                  style={{
                    color: active === link.label ? "#67e8f9" : "#9ca3af",
                  }}
                >
                  {link.label}

                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-cyan-400 transition-all duration-300"
                    style={{ width: active === link.label ? "60%" : "0%" }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            onClick={handleDownloadPDF}
            className="hidden md:inline-flex items-center gap-2 justify-center px-5 py-2 rounded-full border border-cyan-400/30 text-cyan-300 text-sm tracking-wider hover:bg-cyan-400/10 transition-all duration-300"
          >
            {isPdfLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
              </>
            ) : (
              <>
                <Download size={18} />
                <span>Profile</span>
              </>
            )}
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-px bg-gray-300 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-gray-300"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-px bg-gray-300 origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-white/5 md:hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <a
                    key={link.label}
                    onClick={() => {
                      setActive(link.label);
                      setMenuOpen(false);
                      scrollTo(link.id);
                    }}
                    className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0 text-sm tracking-wider transition-colors duration-200"
                    style={{
                      color: active === link.label ? "#67e8f9" : "#9ca3af",
                    }}
                  >
                    {active === link.label && (
                      <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                    )}
                    {link.label}
                  </a>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.25 }}
                className="pt-3"
              >
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-cyan-400/30 text-cyan-300 text-sm tracking-wider hover:bg-cyan-400/10 transition-all duration-300"
                >
                  Download Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
