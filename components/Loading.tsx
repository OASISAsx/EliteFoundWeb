import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/60">
      <div className="relative flex items-center justify-center">
        {/* 1. วงแหวนหลัก - ปรับให้หนาขึ้นและใช้สีเข้มขึ้นเพื่อให้มองเห็นชัด */}
        <div
          className="w-16 h-16 rounded-full border-[4px] border-transparent animate-spin"
          style={{
            borderTopColor: "#6366f1",
            borderRightColor: "rgba(99, 102, 241, 0.3)",
          }}
        ></div>

        {/* 2. วงแหวนชั้นใน - หมุนสวนทางเพิ่มความเท่ */}
        <div
          className="absolute w-10 h-10 rounded-full border-[3px] border-transparent animate-spin-reverse opacity-60"
          style={{
            borderBottomColor: "#6366f1",
            borderLeftColor: "rgba(99, 102, 241, 0.2)",
          }}
        ></div>

        {/* 3. แสงฟุ้งตรงกลาง - ปรับให้เข้มขึ้นเพื่อให้เห็น Aura */}
        <div
          className="absolute w-14 h-14 rounded-full blur-xl animate-pulse"
          style={{ backgroundColor: "rgba(99, 102, 241, 0.4)" }}
        ></div>

        {/* 4. จุดแกนกลาง - เพิ่มความสว่างสูงสุด */}
        <div
          className="absolute w-2 h-2 rounded-full shadow-[0_0_15px_#6366f1]"
          style={{ backgroundColor: "#6366f1" }}
        ></div>
      </div>

      {/* ข้อความ Loading - ปรับให้เข้มขึ้น */}
      <div className="absolute mt-32">
        <p
          className="text-[20px] font-bold tracking-[0.4em] uppercase animate-pulse"
          style={{ color: "#6366f1" }}
        >
          Loading
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
