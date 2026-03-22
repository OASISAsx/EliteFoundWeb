"use client";

import { useState } from "react";
import {
  Send,
  Loader2,
  Download,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Instagram,
  Github,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { GitHub } from "@mui/icons-material";
import { Box, Card } from "@mui/material";

/**
 * Contact Page - All-in-One Component
 *
 * Design Philosophy: Modern Minimalist with Glassmorphism
 * - Deep dark background with cyan accent color
 * - Glass effect cards with backdrop blur
 * - Smooth animations and hover effects
 * - Responsive layout with proper spacing
 * - Typography: Playfair Display for headings, Poppins for body
 */

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  // Contact Information - Customize these values
  const contactData = {
    email: "wave001133@gmail.com",
    phone: "+66 (0) 996769470",
    address: "Bangkok, Thailand",
    lineUrl: "https://line.me/ti/p/wavekungoasis777-",
    instagramUrl: "https://instagram.com/waveskung",
    pdfUrl: "/PDF/Resume.pdf",
    github: "https://github.com/OASISAsx",
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      const mailtoLink = `mailto:?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`,
      )}`;
      window.location.href = mailtoLink;

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
      }, 3000); // 1 วินาที
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-64 h-84">
                <motion.img
                  src="/images/profile2.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full  saturate-90 contrast-105"
                  animate={{
                    boxShadow: [
                      "0 12px 30px rgba(0, 212, 255, 0.15)",
                      "0 18px 45px rgba(0, 212, 255, 0.25)",
                      "0 12px 30px rgba(0, 212, 255, 0.15)",
                    ],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-foreground">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                We would love to hear from you. Send us a message and we will
                respond as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // กลางแนวนอน
          alignItems: "center", // กลางแนวตั้ง
        }}
      >
        <Card
          sx={{
            display: "flex",
            borderRadius: "12px",
            justifyContent: "center", // Centers horizontally
            alignItems: "center", // Centers vertically
            width: "1200px",
            background: "rgba(20,20,40,0.7)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          }}
        >
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Email Card */}
                <a
                  href={`mailto:${contactData.email}`}
                  className="glass glass-hover p-6 flex items-start gap-4 cursor-pointer transition-all duration-300"
                >
                  <div className="flex-shrink-0 text-accent mt-1">
                    <Mail size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      Email
                    </p>
                    <p className="text-foreground font-semibold break-words">
                      {contactData.email}
                    </p>
                  </div>
                </a>

                {/* Phone Card */}
                <a
                  href={`tel:${contactData.phone.replace(/\s/g, "")}`}
                  className="glass glass-hover p-6 flex items-start gap-4 cursor-pointer transition-all duration-300"
                >
                  <div className="flex-shrink-0 text-accent mt-1">
                    <Phone size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      Phone
                    </p>
                    <p className="text-foreground font-semibold break-words">
                      {contactData.phone}
                    </p>
                  </div>
                </a>

                {/* Address Card */}
                <div className="glass glass-hover p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 text-accent mt-1">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      Address
                    </p>
                    <p className="text-foreground font-semibold break-words">
                      {contactData.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>
      </Box>
      {/* Main Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleFormSubmit} className="glass p-8 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    placeholder="Subject (optional)"
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Your message here..."
                    rows={5}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full glass glass-hover px-6 py-3 flex items-center justify-center gap-2 font-medium text-accent hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${contactData.email}`}
                    className="glass glass-hover p-4 flex items-center gap-3 text-accent hover:text-accent transition-colors duration-300"
                  >
                    <Mail size={20} />
                    <span>Send Email</span>
                  </a>
                  <a
                    href={`tel:${contactData.phone.replace(/\s/g, "")}`}
                    className="glass glass-hover p-4 flex items-center gap-3 text-accent hover:text-accent transition-colors duration-300"
                  >
                    <Phone size={20} />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href={contactData.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass glass-hover p-4 flex items-center justify-center text-accent hover:scale-110 transition-transform duration-300 rounded-full"
                    title="Chat on Line"
                  >
                    <MessageCircle size={20} />
                  </a>
                  <a
                    href={contactData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass glass-hover p-4 flex items-center justify-center text-accent hover:scale-110 transition-transform duration-300 rounded-full"
                    title="Follow on Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href={contactData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass glass-hover p-4 flex items-center justify-center text-accent hover:scale-110 transition-transform duration-300 rounded-full"
                    title="Follow on Instagram"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Download PDF Section */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Download</h3>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isPdfLoading}
                  className="w-full glass glass-hover px-6 py-3 flex items-center justify-center gap-2 font-medium text-accent hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPdfLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      <span>Download Profile</span>
                    </>
                  )}
                </button>
              </div>

              {/* Info Box */}
              <div className="glass p-6 border-l-4 border-accent">
                <h4 className="font-bold text-accent mb-2">Response Time</h4>
                <p className="text-sm text-muted-foreground">
                  We typically respond to inquiries within 24 hours during
                  business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-4">
            <a
              href={contactData.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on Line"
              className="glass glass-hover p-4 flex items-center justify-center text-accent hover:scale-110 transition-transform duration-300"
            >
              <MessageCircle size={24} />
            </a>
            <a
              href={contactData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on Instagram"
              className="glass glass-hover p-4 flex items-center justify-center text-accent hover:scale-110 transition-transform duration-300"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
