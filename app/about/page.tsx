"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const About = () => {
  const [form, setForm] = useState({
    full_name: "",
    last_name: "",
    id_card: "",
    status: "Process",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-700"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-white tracking-wide">
          แบบฟรอมข้อมูลส่วนตัว ขอกู้เงิน
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white border border-slate-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white border border-slate-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="id_card"
            placeholder="ID Card"
            value={form.id_card}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white border border-slate-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
            required
          />

          <div>
            <label className="text-sm text-gray-400">Upload ID Card</label>
            <motion.input
              whileHover={{ scale: 1.02 }}
              type="file"
              className="w-full mt-1 text-gray-400 file:bg-cyan-600 file:text-white file:border-none file:rounded-lg file:px-4 file:py-2 file:cursor-pointer"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Status</label>
            <input
              type="text"
              value="Process"
              disabled
              className="w-full bg-slate-700 text-gray-400 border border-slate-600 p-3 rounded-xl"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/40 transition"
          >
            Submit Request
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default About;
