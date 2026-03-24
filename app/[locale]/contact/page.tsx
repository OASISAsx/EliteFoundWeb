"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputAdornment,
  Snackbar,
  Alert,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import emailjs from "@emailjs/browser";

// ── Dark MUI Theme ──────────────────────────────────────────────────────────
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" },
    background: { default: "#0a0a0f", paper: "#111118" },
  },
  typography: { fontFamily: "var(--font-body)" },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: "rgba(255,255,255,0.03)",
            borderRadius: "10px",
            "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
            "&:hover fieldset": { borderColor: "rgba(99,102,241,0.5)" },
            "&.Mui-focused fieldset": { borderColor: "#6366f1" },
          },
          "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.35)" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
          "& .MuiInputBase-input": { color: "rgba(255,255,255,0.85)" },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.03)",
          borderRadius: "10px",
          color: "rgba(255,255,255,0.85)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.08)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(99,102,241,0.5)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6366f1",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: "#111118",
          color: "rgba(255,255,255,0.85)",
          "&:hover": { background: "rgba(99,102,241,0.15)" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
        },
      },
    },
  },
});

// ── Data ────────────────────────────────────────────────────────────────────
const INFO_CARDS = [
  {
    icon: <SupportAgentOutlinedIcon sx={{ fontSize: 24 }} />,
    title: "Customer Support",
    desc: "Our team is available around the clock to address any concerns or queries you may have.",
    color: "#6366f1",
  },
  {
    icon: <RateReviewOutlinedIcon sx={{ fontSize: 24 }} />,
    title: "Feedback & Suggestions",
    desc: "We value your feedback and are continuously working to improve Snappy.",
    color: "#8b5cf6",
  },
  {
    icon: <NewspaperOutlinedIcon sx={{ fontSize: 24 }} />,
    title: "Media Inquiries",
    desc: "For press inquiries, please contact us at media@snappyapp.com.",
    color: "#a78bfa",
  },
];

const COUNTRY_CODES = ["+62", "+66", "+1", "+44", "+81", "+86", "+91"];

// ── Floating orbs ───────────────────────────────────────────────────────────
const Orb = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="pointer-events-none absolute rounded-full blur-[120px] opacity-20"
    style={style}
  />
);

// ── Main Component ──────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+66",
    phone: "",
    message: "",
  });
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [snack, setSnack] = useState(false);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const cardsRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: "-80px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

  const handleChange = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (field === "message") setCharCount(value.length);
  };

  const handleSubmit = async () => {
    if (!form.email || !form.message) return;
    const currentDate = new Date();

    const formatted = currentDate.toLocaleString("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE!,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE!,
        {
          from_name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: `${form.countryCode}${form.phone}`,
          message: form.message,
          time: formatted,
        },
        process.env.NEXT_PUBLIC_EMAIL_KEY!,
      );

      setSubmitted(true);
      setSnack(true);
    } catch (err) {
      console.error("Send email failed:", err);
    }
  };

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="relative min-h-screen overflow-hidden ">
        {/* ── Ambient orbs ── */}
        {/* <Orb style={{ width: 600, height: 600, background: '#6366f1', top: '-10%', left: '-10%' }} />
        <Orb style={{ width: 500, height: 500, background: '#8b5cf6', bottom: '0%', right: '-5%' }} />
        <Orb style={{ width: 300, height: 300, background: '#4f46e5', top: '40%', left: '40%' }} /> */}

        {/* ── Subtle grid ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* ── Main Content ── */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-30">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* ── Left: Hero + Info ── */}
            <div ref={heroRef}>
              <motion.div
                animate={heroInView ? stagger(0).animate : stagger(0).initial}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  We typically reply within 24 hours
                </div>
              </motion.div>

              <motion.h1
                animate={heroInView ? stagger(1).animate : stagger(1).initial}
                className="text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-5"
                // style={{ fontFamily: 'var(--font-display)' }}
              >
                Contact {""}
                <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
                  Us
                </span>
              </motion.h1>

              <motion.p
                animate={heroInView ? stagger(2).animate : stagger(2).initial}
                className="text-white/50 text-lg leading-relaxed mb-8 max-w-sm"
              >
                Email, call, or complete the form to learn how Snappy can solve
                your messaging problem.
              </motion.p>

              <motion.div
                animate={heroInView ? stagger(3).animate : stagger(3).initial}
                className="flex flex-col gap-3 mb-12"
              >
                {[
                  {
                    icon: <EmailOutlinedIcon sx={{ fontSize: 18 }} />,
                    label: "wave001133@gmail.com",
                  },
                  {
                    icon: <PhoneOutlinedIcon sx={{ fontSize: 18 }} />,
                    label: "099-676-9470",
                  },
                ].map(({ icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="inline-flex items-center gap-3 text-white/60 hover:text-indigo-300 transition-colors text-sm"
                  >
                    <span className="text-indigo-400">{icon}</span>
                    {label}
                  </a>
                ))}
              </motion.div>

              {/* Info Cards */}
              <div ref={cardsRef} className="flex flex-col gap-3">
                {INFO_CARDS.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      cardsInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ x: 4 }}
                    className="group flex items-start gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all cursor-default"
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${card.color}20`,
                        color: card.color,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-white/85 font-semibold text-sm mb-0.5">
                        {card.title}
                      </p>
                      <p className="text-white/40 text-xs leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Right: Form Card ── */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={formInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow behind card */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-indigo-600/30 via-violet-600/20 to-transparent blur-xl" />

              <div className="relative rounded-3xl border border-white/[0.08] bg-[#111118]/90 backdrop-blur-xl p-8 shadow-2xl">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.1,
                        }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{ fontSize: 64, color: "#6366f1" }}
                        />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">
                        Message Sent!
                      </h3>
                      <p className="text-white/50 text-sm max-w-xs">
                        Thank you for reaching out. We&apos;ll get back to you
                        within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            firstName: "",
                            lastName: "",
                            email: "",
                            countryCode: "+66",
                            phone: "",
                            message: "",
                          });
                          setCharCount(0);
                        }}
                        className="mt-4 text-indigo-400 text-sm hover:text-indigo-300 underline underline-offset-2"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-16 text-center gap-4"
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-7">
                        <h2
                          className="text-3xl font-bold text-white mb-1"
                          // style={{ fontFamily: 'var(--font-display)' }}
                        >
                          Get in Touch
                        </h2>
                        <p className="text-white/40 text-sm">
                          You can reach us anytime
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        {/* Name Row */}
                        <div className="grid grid-cols-2 gap-3">
                          <TextField
                            label="First name"
                            size="small"
                            fullWidth
                            required
                            value={form.firstName}
                            onChange={(e) =>
                              handleChange("firstName", e.target.value)
                            }
                          />
                          <TextField
                            label="Last name"
                            size="small"
                            fullWidth
                            required
                            value={form.lastName}
                            onChange={(e) =>
                              handleChange("lastName", e.target.value)
                            }
                          />
                        </div>

                        {/* Email */}
                        <TextField
                          label="Your email"
                          type="email"
                          size="small"
                          required
                          fullWidth
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailOutlinedIcon
                                  sx={{
                                    fontSize: 18,
                                    color: "rgba(255,255,255,0.3)",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />

                        {/* Phone */}
                        <div className="flex gap-2">
                          <FormControl size="small" sx={{ minWidth: 96 }}>
                            <Select
                              value={form.countryCode}
                              onChange={(e) =>
                                handleChange("countryCode", e.target.value)
                              }
                            >
                              {COUNTRY_CODES.map((c) => (
                                <MenuItem key={c} value={c}>
                                  {c}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            label="Phone number"
                            size="small"
                            required
                            fullWidth
                            type="tel"
                            placeholder="0812345678"
                            value={form.phone}
                            inputProps={{ maxLength: 10 }}
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                "",
                              );
                              handleChange("phone", value);
                            }}
                          />
                        </div>

                        {/* Message */}
                        <div className="relative">
                          <TextField
                            label="How can we help?"
                            multiline
                            rows={4}
                            fullWidth
                            inputProps={{ maxLength: 120 }}
                            value={form.message}
                            onChange={(e) =>
                              handleChange("message", e.target.value)
                            }
                          />
                          <span className="absolute bottom-3 right-3 text-white/25 text-xs">
                            {charCount}/120
                          </span>
                        </div>

                        {/* Submit */}
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            endIcon={<SendIcon sx={{ fontSize: 18 }} />}
                            onClick={handleSubmit}
                            sx={{
                              py: 1.5,
                              background:
                                "linear-gradient(135deg, #6366f1 0%, #67c4f9 100%)",
                              boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #818cf8 0%, #67c4f9 100%)",
                                boxShadow: "0 12px 40px rgba(99,102,241,0.5)",
                              },
                            }}
                          >
                            Submit
                          </Button>
                        </motion.div>

                        <p className="text-center text-white/25 text-xs leading-relaxed">
                          By contacting us, you agree to our{" "}
                          <a
                            href="#"
                            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-1"
                          >
                            Terms of service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-1"
                          >
                            Privacy Policy
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <Snackbar
        open={snack}
        autoHideDuration={4000}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ borderRadius: "10px", background: "#6366f1" }}
        >
          Your message has been sent successfully!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
