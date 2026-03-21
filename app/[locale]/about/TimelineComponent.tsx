import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { timeline, TimeLineType } from "./data";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DialogTimeline from "./DialogTimeline";

export default function DevTimeline() {
  // const [show, setShow] = useState(false);
  // const router = useRouter();
  const [dialog , setDialog] = useState(false);
 const [selectedItem, setSelectedItem] = useState<TimeLineType | null>(null);

console.log(timeline,'timeline')
const selectItems = (item: TimeLineType) => {
  setSelectedItem(item);
  setDialog(true);

};
  // const backRef = useRef<HTMLButtonElement>(null);
  // const contactRef = useRef<HTMLButtonElement>(null);
  // const bottomRef = useRef<HTMLDivElement>(null);
  // // Contact button
  // const xContact = useMotionValue(0);
  // const yContact = useMotionValue(0);
  // const springXContact = useSpring(xContact, { stiffness: 200, damping: 20 });
  // const springYContact = useSpring(yContact, { stiffness: 200, damping: 20 });

  // // Back button
  // const xBack = useMotionValue(0);
  // const yBack = useMotionValue(0);
  // const springXBack = useSpring(xBack, { stiffness: 200, damping: 20 });
  // const springYBack = useSpring(yBack, { stiffness: 200, damping: 20 });

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setShow(entry.isIntersecting);
  //     },
  //     { threshold: 1 },
  //   );

  //   if (bottomRef.current) observer.observe(bottomRef.current);

  //   return () => observer.disconnect();
  // }, []);

  // const createMouseMove =
  //   (x: MotionValue<number>, y: MotionValue<number>) =>
  //   (e: React.MouseEvent<HTMLButtonElement>) => {
  //     const rect = e.currentTarget.getBoundingClientRect();

  //     const offsetX = e.clientX - rect.left - rect.width / 2;
  //     const offsetY = e.clientY - rect.top - rect.height / 2;

  //     x.set(offsetX * 0.15);
  //     y.set(offsetY * 0.15);
  //   };

  // const createMouseLeave =
  //   (x: MotionValue<number>, y: MotionValue<number>) => () => {
  //     x.set(0);
  //     y.set(0);
  //   };

  // const onClickMove = () => {
  //   router.push("/contact");
  // };
  // const onClickBack = () => {
  //   router.push("/");
  // };
  return (
    <div className="relative max-w-6xl mx-auto py-20 px-4">
      <div className="relative max-w-6xl mx-auto py-20 px-4">
        {/* เส้นกลาง */}

        <div className="space-y-24">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-white/10 -translate-x-1/2" />
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              onClick={() => selectItems(item)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-start">
                {/* ซ้าย */}
                <div
                  className={i % 2 === 0 ? "md:col-span-1" : "hidden md:block"}
                />

                {/* dot */}
                <div className="hidden md:flex justify-center relative">
                  <span className="h-4 w-4 bg-sky-400 rounded-full shadow-[0_0_12px_#38bdf8]" />
                </div>

                {/* ขวา / Card */}
                <div
                  className={`md:col-span-1 ${
                    i % 2 === 0 ? "md:col-start-3" : "md:col-start-1"
                  }`}
                >
                  <div className="w-full bg-white/5 backdrop-blur rounded-xl overflow-hidden shadow-lg">
                    <div className="relative aspect-video overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6 md:p-8">
                      <p className="text-sky-400 text-sm">{item.year}</p>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm">{item.company}</p>
                      <p className="text-white/60 mt-4 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <DialogTimeline item={selectedItem} dialog={dialog} onClose={() => setDialog(false)}/>
      </div>
      {/* <div ref={bottomRef} className="h-10" /> */}
      {/* ปุ่มเหมือนเดิม ไม่ต้องแก้ */}
      {/* <AnimatePresence mode="wait"> */}
        {/* {show && ( */}
          <>
            {/* RIGHT BUTTON */}
            {/* <motion.div
              key="contact-btn"
              className="fixed bottom-6 right-6 z-50"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
            >
              <motion.button
                type="button"
                ref={contactRef}
                onClick={onClickMove}
                onMouseMove={createMouseMove(xContact, yContact)}
                onMouseLeave={createMouseLeave(xContact, yContact)}
                className="px-6 py-4 rounded-2xl bg-white text-black font-semibold shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  style={{ x: springXContact, y: springYContact }}
                  className="flex items-center"
                >
                  Contact
                  <ArrowForwardIosIcon className="ml-2 text-black" />
                </motion.span>
              </motion.button>
            </motion.div>

            {/* LEFT BUTTON */}
            {/* <motion.div
              key="back-btn"
              className="fixed bottom-6 left-6 z-50"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
            >
              <motion.button
                type="button"
                ref={backRef}
                onClick={onClickBack}
                onMouseMove={createMouseMove(xBack, yBack)}
                onMouseLeave={createMouseLeave(xBack, yBack)}
                className="px-6 py-4 rounded-2xl bg-white text-black font-semibold shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  style={{ x: springXBack, y: springYBack }}
                  className="flex items-center"
                >
                  <ArrowBackIosNewIcon className="mr-2 text-black" />
                  Back
                </motion.span>
              </motion.button>
            </motion.div> */}
          </>
        {/* )} */}
      {/* </AnimatePresence> */}
    </div>
  );
}
