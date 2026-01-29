"use client";

import { Card, CardContent } from "@mui/material";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { ClockIcon } from "@mui/x-date-pickers";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
// import { LOAN_STATUS_CONFIG } from "@/src/constants/statusDefault";

type StatusCount = Partial<Record<string, number>>;

type Props = {
  status: StatusCount;
};

export const LOAN_STATUS_CONFIG = {
  PENDING: {
    label: "รอดำเนินการ",
    color: "bg-yellow-100 text-yellow-700",
    icon: ClockIcon,
  },
  APPROVED: {
    label: "อนุมัติแล้ว",
    color: "bg-blue-100 text-blue-700",
    icon: GridCheckCircleIcon,
  },
  ACTIVE: {
    label: "กำลังผ่อน",
    color: "bg-green-100 text-green-700",
    icon: CheckCircleIcon,
  },
  COMPLETED: {
    label: "ปิดสัญญา",
    color: "bg-gray-100 text-gray-700",
    icon: CheckCircleIcon,
  },
  REJECTED: {
    label: "ปฏิเสธ",
    color: "bg-red-100 text-red-700",
    icon: XCircleIcon,
  },
} as const;

export default function LoanStatusCards({ status }: Props) {
  console.log(status, "status");
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {Object.entries(LOAN_STATUS_CONFIG)
        .filter(([key]) => key in status)
        .map(([key, config]) => {
          const Icon = config.icon;
          const value = status[key] ?? 0;

          return (
            <Card
              key={key}
              className="rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <CardContent className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${config.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">{config.label}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
