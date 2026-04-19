import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function WorkHistory() {
  const t = useTranslations("workHistory");

  return (
    <div>
      <div className="max-w-6xl w-full pt-10">
        <h3 className=" text-white text-3xl font-semibold p-10">
          {t("title")}
        </h3>
        <div className="relative grid md:grid-cols-2 gap-12 sx:gap-8 px-6">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-white/20" />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-white text-xl font-semibold ">
                {t("jobs.poontana.position")}
              </h3>
              <div className="bg-white h-[45px] w-[160px] rounded-md flex items-center justify-center mb-2">
                <Image
                  src="/images/poon_logo.png"
                  alt="Company logo"
                  width={160}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-3">
              {t("jobs.poontana.period")}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {t("jobs.poontana.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-white text-xl font-semibold">
                {t("jobs.dexon.position")}
              </h3>

              <Image
                className="items-center justify-center mb-2 rounded-md "
                alt=""
                src={"../images/dexon.jpg"}
                width={160}
                height={50}
              />
            </div>
            <p className="text-gray-400 text-sm mb-3 mt-10">
              {t("jobs.dexon.period")}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {t("jobs.dexon.description")}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
