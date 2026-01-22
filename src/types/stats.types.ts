import React from "react";

export interface StatItem {
  title: string;
  value: string | number;
  icon: React.ElementType; // ⭐ FIX
  color: string;
  change?: string;
}
