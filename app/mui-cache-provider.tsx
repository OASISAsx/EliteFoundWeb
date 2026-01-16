"use client";

import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/components/defaultTheme/emotion-cache";
import { useState } from "react";

export default function MuiCacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = useState(() => createEmotionCache());

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
