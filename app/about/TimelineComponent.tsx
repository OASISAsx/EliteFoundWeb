import { motion } from "framer-motion";
import { timeline } from "./data";

export default function DevTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto py-20">
      {/* vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/10 -translate-x-1/2" />

      <div className="space-y-24">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`relative flex ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {/* dot */}
            <span className="absolute left-1/2 top-8 h-4 w-4 bg-sky-400 rounded-full -translate-x-1/2 shadow-[0_0_12px_#38bdf8]" />

            {/* card */}
            <div className="w-[45%] bg-white/5 backdrop-blur rounded-xl overflow-hidden shadow-lg">
              {/* image */}
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* content */}
              <div className="p-6">
                <p className="text-sky-400 text-sm">{item.year}</p>
                <h3 className="text-xl font-bold text-white mt-1">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm">{item.company}</p>
                <p className="text-white/60 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
